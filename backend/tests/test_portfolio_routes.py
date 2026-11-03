# Regression: screenshot download removed; SPA routes served
import os
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")


def test_api_root():
    r = requests.get(f"{BASE_URL}/api/", timeout=20)
    assert r.status_code == 200 and r.json()["message"] == "Hello World"


def test_screenshot_endpoint_removed():
    r = requests.get(f"{BASE_URL}/api/downloads/screenshots", timeout=20)
    assert r.status_code == 404


def test_downloads_page_serves_spa():
    r = requests.get(f"{BASE_URL}/downloads/index.html", timeout=20)
    assert r.status_code == 200
    assert 'id="root"' in r.text
    assert "dhairya-portfolio-screenshots.zip" not in r.text


def test_legacy_zip_not_served():
    r = requests.get(f"{BASE_URL}/downloads/dhairya-portfolio-screenshots.zip", timeout=20)
    assert "application/zip" not in r.headers.get("content-type", "")


def test_spa_routes():
    for p in ["/", "/wispr", "/WISPR", "/whisper"]:
        r = requests.get(f"{BASE_URL}{p}", timeout=20)
        assert r.status_code == 200 and 'id="root"' in r.text, p
