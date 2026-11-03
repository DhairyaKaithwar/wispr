export const stories = [
  {
    title: "Museum of Failures: When We Almost Built a Queue to Solve a Locking Problem",
    role: "I implemented the Redis distributed lock around the scheme-enrichment cron so that only one application instance could start a batch at a time.",
    body: `## The problem
We had a mutual fund enrichment process responsible for updating more than 3,000 schemes.
Initially, a cron job handled the entire operation. It fetched schemes, called external provider APIs, processed the responses and updated MongoDB.
It worked well until the number of schemes grew.
The processing time started becoming unpredictable. Sometimes, the provider responded quickly; other times, API rate limits slowed everything down. A job that was supposed to finish within its scheduled interval occasionally continued running into the next execution window.
And that is where things started going wrong.
Imagine this:
- At 10:00 AM, Instance A starts processing 3,000 schemes.
- At 10:30 AM, the next cron execution fires, but Instance A is still working.
- Instance B starts another execution.
Now two instances are processing the same collection of schemes, making duplicate provider requests, increasing the possibility of rate limiting and putting additional pressure on MongoDB.
We had a problem that was not necessarily about processing speed. It was about controlling execution.
## The tempting solution: BullMQ
Our first instinct was to introduce a proper background job-processing system.
BullMQ was an obvious candidate.
We could push every scheme into a Redis-backed queue, create multiple workers, distribute the workload across instances, configure retries, control concurrency and manage failures independently.
Architecturally, it was a much more scalable approach.
But then we stopped and asked ourselves a different question:
Were we actually struggling to manage thousands of independent jobs, or were we simply allowing the same batch operation to execute more than once?
At that point, we realised we were considering introducing an entire job-processing architecture to solve a narrower problem.
BullMQ would bring additional responsibilities:
- Queue producers and consumers.
- Job lifecycle management.
- Retry and failure handling.
- Queue monitoring.
- Job deduplication and idempotency.
- Additional operational complexity.
All of these are valuable capabilities. But did we need all of them to solve our immediate problem?
Not yet.
## The decision: Redis distributed locking
We decided to take a smaller step.
Instead of redesigning the entire enrichment pipeline, we introduced a Redis distributed lock around the cron execution.
The idea was simple:
- Before processing schemes, an instance must acquire a lock in Redis.
- If another instance already holds that lock, the new execution skips the batch.
- Only the instance that successfully acquires the lock is allowed to execute the enrichment process.
We used an ownership token with the lock, so an instance could release only the lock it had acquired. We also considered lock expiration and periodic renewal to avoid a long-running process losing its lock prematurely.
The execution flow became:
- Cron triggers on the scheduled interval.
- The instance attempts to acquire the Redis lock.
- If the lock already exists, the execution is skipped.
- If acquired, the instance fetches eligible schemes from MongoDB.
- Schemes are processed with controlled concurrency.
- Provider requests are throttled according to the provider's limits.
- Once processing finishes, the instance releases the lock.
This addressed the duplicate execution problem without introducing an entirely new job-processing layer.
## But did Redis solve everything?
No. And this distinction matters.
A distributed lock prevents multiple instances from executing the same batch simultaneously. It does not make the batch faster, eliminate provider rate limits or provide independent retries for every scheme.
We still needed bounded concurrency and request throttling.
We also had to consider what happens if an instance crashes, its lock expires, or an old process continues executing after another instance acquires a new lock.
The solution had to account for those failure scenarios rather than assuming that acquiring a lock made the entire process safe.
## Why not BullMQ?
We did not reject BullMQ because it was unnecessary technology or because it was inferior.
We deferred it because its capabilities exceeded the immediate requirement.
If the requirement had been to distribute 3,000 independent jobs across multiple machines, retry individual failed schemes, persist unfinished work across restarts and dynamically scale workers, BullMQ would have been a much stronger choice.
But our immediate requirement was to guarantee that only one enrichment batch could execute at a time, while controlling how aggressively we called the provider.
Redis locking, bounded concurrency and rate limiting were sufficient for that scope.
We could introduce BullMQ later without treating today's simpler solution as a permanent architectural limitation.
## The lesson
There is a difference between building an industry-standard architecture and building the architecture that is appropriate for your current problem.
We often associate engineering maturity with more infrastructure, more abstractions and more sophisticated systems.
But sometimes engineering maturity means resisting that temptation.
We did not need to build a distributed job-processing platform just because our workload contained 3,000 records.
We needed to understand why the system was failing, isolate the actual cause and introduce the smallest reliable mechanism that addressed it.
BullMQ was a valid solution. Redis distributed locking was a better fit for the immediate problem.
The lesson was not to avoid sophisticated engineering. It was to know when sophistication is justified.
Good engineering is not about using the most powerful tool available. It is about understanding the failure well enough to choose the right tool.`,
  },
  {
    title: "Museum of Failures: The Same Transaction Arrived Twice",
    role: "I worked on message-ID-based idempotent callback processing, atomic coordination to prevent concurrent duplicate handling, and reconciliation of asynchronous ONDC transaction events.",
    body: `## The problem
We were building financial transaction workflows on top of ONDC, where different stages of an order lifecycle were handled through asynchronous callbacks.
The challenge was that external systems could retry requests, and callbacks could arrive more than once.
Consider a simple scenario:
A user initiates an investment transaction. Our system sends a request to the external network and receives an asynchronous callback confirming an action.
But due to a network timeout or retry mechanism, the same callback arrives again.
From the application's perspective, another request has arrived. But from the business perspective, nothing new has happened. It is the same action being reported again.
If we process both callbacks independently, we risk applying the same transaction action twice.
## The investigation
We realised that simply checking whether a transaction had already been processed was not sufficient.
Imagine two callback handlers receiving the same message at almost exactly the same time:
- Handler A checks whether the message has been processed. It hasn't.
- Handler B performs the same check. It also finds that the message hasn't been processed.
- Both handlers proceed with processing.
This is a classic race condition. Even though both handlers perform duplicate checks, they can still execute the same action.
The problem wasn't just duplicate requests. It was the absence of atomic coordination between checking and processing.
## The decision: Idempotency + Atomic Locking
We identified the ONDC message_id as our idempotency key.
Each action in our request had a unique message ID. The rule became simple:
The same message ID must never apply the same action more than once.
Before processing a callback, we attempted to acquire atomic ownership for that message ID.
The flow became:
- An ONDC callback arrives with its message_id.
- The handler attempts to atomically acquire ownership for that message ID.
- If another handler already owns it, the duplicate execution is skipped.
- If ownership is acquired, the handler validates the transaction's current state.
- The corresponding action is processed.
- The message ID is recorded as processed, ensuring subsequent deliveries of the same message are ignored.
We also used callback reconciliation to ensure asynchronous responses were handled against the correct transaction lifecycle rather than blindly applying every incoming callback.
## The overengineering we avoided
There was a much heavier architectural direction we could have taken.
We could have introduced a Kafka-based event-processing pipeline with dedicated consumers, an event store, the Inbox/Outbox pattern, dead-letter queues and Saga orchestration to manage distributed transaction workflows.
This would have provided infrastructure for event persistence, replay, failure recovery and distributed workflow coordination.
But we stepped back and evaluated the actual failure.
Our problem wasn't that we lacked an event-streaming platform or a sophisticated workflow orchestrator. The problem was that the same ONDC action, identified by its unique message_id, could be delivered and processed more than once.
Introducing Kafka wouldn't have eliminated this problem either. Kafka consumers can also receive messages more than once, so we would still need idempotent consumers and duplicate detection.
We would have introduced additional infrastructure, deployment requirements, monitoring and operational complexity without addressing the fundamental correctness problem any better.
Instead, we used the existing message identifier as our idempotency key, combined with atomic locking to prevent concurrent handlers from processing the same action. Callback reconciliation helped us maintain consistency across the transaction lifecycle.
We avoided building an event-processing platform when what we actually needed was a reliable idempotency boundary.
## The outcome
We established idempotent processing for our asynchronous transaction workflows.
The same message ID could be delivered multiple times without repeatedly applying its business effect. Atomic locking prevented concurrent handlers from processing the same message simultaneously, while callback reconciliation helped maintain consistency across the transaction lifecycle.
The important change was that we stopped treating every incoming callback as a new business event.
## The lesson
In distributed systems, duplicate delivery is a reality, not an exception. We cannot always control how many times an external system sends a message, but we can control how many times our system applies its effect.
Design for at-least-once delivery. Make the business operation idempotent.`,
  },
  {
    title: "Museum of Failures: When We Kept Processing Data That Hadn't Changed",
    role: "I worked on entity-level incremental synchronization across the Provider, Scheme, Plan and Fulfillment collections, including stable-identifier mapping and marking removed schemes as inactive.",
    body: `## The problem
We were building an ONDC-based mutual fund platform that ingested and normalized catalog data from 20+ external providers.
As the catalog grew to more than 3,000 schemes and related entities, our synchronization process became increasingly expensive.
The initial approach relied heavily on full catalog synchronization. Every cycle involved processing the entire catalog, even when most of the underlying data hadn't changed.
This created three problems:
- Processing overhead: We repeatedly processed thousands of records, consuming unnecessary application and database resources.
- Synchronization time: Full ingestion cycles took longer as the catalog grew, increasing the effort required to keep the data updated.
- Data consistency: Reprocessing the entire catalog did not automatically guarantee that provider-side updates and deletions were correctly reflected in our internal data.
We realised that we were treating every synchronization cycle as though the entire catalog had changed.
## The investigation
We looked at how our data was actually structured.
Our catalog wasn't a single collection of records. It consisted of multiple interconnected MongoDB collections:
- Providers
- Schemes
- Plans
- Fulfillments
Each collection represented a different entity with its own data and update requirements.
For example, a change in a scheme's information did not necessarily mean its associated plan or fulfillment data had changed.
Yet our full synchronization approach repeatedly processed these interconnected entities regardless of whether their underlying data had changed.
We realised that we needed to move away from full-catalog processing and towards entity-level change detection.
## The decision: Incremental synchronization
We redesigned the synchronization approach around the individual data entities.
Instead of treating the entire catalog as one unit, we evaluated incoming data against the corresponding records in each collection.
The synchronization logic considered the data and update requirements of individual entity types:
- Providers: Identify changes in provider records and update the corresponding entities.
- Schemes: Process schemes whose relevant data had changed.
- Plans: Independently identify and update changed plan information.
- Fulfillments: Synchronize fulfillment data without unnecessarily reprocessing unrelated entities.
We used stable identifiers to maintain relationships across collections and ensure that incoming records mapped to the correct existing entities.
This meant that a change in one entity did not automatically require reprocessing every related collection.
We also addressed an important edge case: provider-side deletions.
If a scheme was no longer present in the incoming catalog, we did not physically delete it from MongoDB. We marked the corresponding record as inactive.
This preserved historical references and relationships while ensuring that outdated schemes were no longer treated as active catalog entries.
## The overengineering we avoided
A more elaborate alternative would have been to introduce a dedicated Change Data Capture (CDC) platform with Kafka, Debezium, event streaming and independent synchronization pipelines.
That architecture could support continuous change propagation and large-scale event-driven data integration.
But we didn't need to introduce an entirely new data infrastructure to solve the immediate problem.
Our bottleneck was repeated full-catalog processing, not a lack of real-time event streaming.
We already had structured MongoDB collections, stable identifiers and existing ingestion pipelines. We could make synchronization more intelligent by detecting changes at the entity level rather than introducing another distributed infrastructure layer.
We chose to optimize the existing data pipeline rather than build another platform around it.
## The outcome
The change had a measurable impact.
Across a catalog containing more than 3,000 records, our incremental synchronization approach reduced the number of records processed per synchronization cycle by approximately 99.8%, based on our internal measurements.
Instead of repeatedly processing the entire catalog, we focused on the individual entities that actually required updates.
This significantly reduced unnecessary processing and database operations while improving synchronization efficiency.
We also handled provider-side deletions more safely by marking records inactive rather than physically removing them.
## The lesson
A large catalog doesn't necessarily require processing every record during every synchronization cycle.
The important thing is understanding the relationships between your data entities and identifying exactly what has changed.
Optimize synchronization at the entity level, not by repeatedly refreshing the entire dataset.`,
  },
  {
    title: "Museum of Failures: When We Realised the LLM Couldn't Own Business Logic",
    role: "I implemented backend guardrails for the conversational workflow: request-specific tool schemas, server-side category-path resolution, and enforcement of the information-gathering invariant.",
    body: `## The problem
We were building an agentic conversational backend for financial advisory workflows using Python, FastAPI and Gemini.
The system supported workflows such as fund discovery, goal planning, order lookup and grievance handling. We exposed 18 typed tool functions that allowed the LLM to interact with our application.
Initially, we expected the model to understand the conversation, collect the required information and invoke the appropriate tools in the correct sequence.
But we encountered an important problem.
During a financial planning conversation, the LLM sometimes attempted to generate an investment plan before gathering all the required information from the user.
From the model's perspective, it had enough conversational context to produce an answer. But from the application's perspective, essential inputs were still missing.
There was another concern around data correctness. Our database contained dynamic categories and identifiers. Allowing the model to directly determine internal database IDs would introduce unnecessary dependence on probabilistic model output.
We realised that prompting the model to behave correctly wasn't enough. Business-critical correctness needed to be enforced by the application itself.
## The investigation
We identified two separate boundaries that needed deterministic control.
### First: Data correctness.
The LLM should understand categories in human-readable terms, but it shouldn't be responsible for generating or guessing internal database identifiers.
### Second: Workflow correctness.
The LLM could decide how to communicate with the user, but it shouldn't be allowed to bypass mandatory information-gathering steps and jump directly to plan generation.
We needed to separate conversational intelligence from application-level authority.
## The decision: Deterministic guardrails around the LLM
Instead of relying entirely on prompts, we introduced three backend-level controls.
### 1. Dynamic tool schemas from live database state
We generated tool schemas dynamically for each request using the current database state.
Rather than exposing a fixed set of assumptions to the model, we provided the available options based on actual application data.
This helped constrain tool calls to valid, currently available choices.
### 2. Human-readable category paths with server-side ID resolution
We constrained the LLM to work with human-readable category paths instead of internal database IDs.
For example, the model would work with a category path such as:
> Investment → Mutual Funds → Equity → Large Cap
The backend would resolve that path to the corresponding leaf ID.
This kept internal identifiers under application control instead of trusting the LLM to generate them.
### 3. A server-side invariant for conversation state
This was particularly important for the premature plan-generation problem.
We introduced a server-side invariant that enforced the required information-gathering sequence.
If the LLM attempted to generate a plan before collecting the necessary inputs, the backend intercepted that transition and routed the conversation back to the question-gathering stage.
The model could decide how to phrase the next question, but the backend controlled whether the workflow was actually allowed to move forward.
## The overengineering we avoided
A tempting alternative would have been to fine-tune the model specifically for our financial advisory workflows, introduce a second LLM as a critic to validate every response, or build a multi-agent orchestration system to supervise the conversation.
These approaches might have improved model behaviour in certain situations, but they wouldn't have guaranteed business-rule correctness.
Even a fine-tuned model can produce an unexpected response. Another LLM reviewing its output can also make mistakes.
The fundamental issue wasn't that the model needed to become smarter. It was that certain decisions shouldn't have been delegated to the model in the first place.
We kept the solution at the application boundary, where database validation, identifier resolution and workflow invariants could be enforced deterministically.
We didn't try to make the LLM perfectly reliable. We designed the system so that it didn't need to be.
## The outcome
We established a deterministic control layer around the agentic system.
- Tool schemas reflected live database state.
- Category paths were resolved into valid internal leaf IDs by the backend.
- Premature plan-generation attempts were redirected to the information-gathering stage.
- The application retained control over mandatory workflow transitions instead of relying on the LLM to follow instructions consistently.
This made the conversational experience more controlled while preserving the flexibility of natural-language interaction.
## The lesson
An LLM is good at understanding language, interpreting intent and generating responses. But business-critical correctness, database identifiers and transaction state should remain under deterministic application control.
The LLM owns the language. The backend owns the correctness.`,
  },
];
