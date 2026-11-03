# Screenshot zip download endpoint tests
import io
import os
import zipfile

import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
EXPECTED_FOLDERS = {"desktop_intro", "desktop_light", "desktop_dark", "desktop_pages", "mobile"}


@pytest.fixture(scope="module")
def resp():
    return requests.get(f"{BASE_URL}/api/downloads/screenshots", timeout=60)


class TestScreenshotDownload:
    def test_status_200(self, resp):
        assert resp.status_code == 200

    def test_content_type_zip(self, resp):
        assert resp.headers.get("content-type", "").startswith("application/zip")

    def test_content_disposition_attachment(self, resp):
        cd = resp.headers.get("content-disposition", "")
        assert cd.startswith("attachment")
        assert 'filename="dhairya-portfolio-screenshots.zip"' in cd or "filename=dhairya-portfolio-screenshots.zip" in cd

    def test_valid_zip_with_47_jpegs(self, resp):
        zf = zipfile.ZipFile(io.BytesIO(resp.content))
        assert zf.testzip() is None
        jpegs = [n for n in zf.namelist() if n.lower().endswith(".jpeg")]
        assert len(jpegs) == 47, f"found {len(jpegs)}"
        folders = {n.split("/")[-2] for n in jpegs if "/" in n}
        assert EXPECTED_FOLDERS.issubset(folders), folders

    def test_downloads_page_links_to_api(self):
        r = requests.get(f"{BASE_URL}/downloads/index.html", timeout=30)
        assert r.status_code == 200
        assert 'href="/api/downloads/screenshots"' in r.text
