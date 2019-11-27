import requests
import json
from bs4 import BeautifulSoup
from bs4.element import Comment


def tag_visible(element):
    """Remove Tags."""
    if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
        return False
    if isinstance(element, Comment):
        return False
    return True


def array_list(dicts, list_re):
    """Dict iteration."""
    for key, value in dicts.items():
        if isinstance(value, list):
            if len(value) > 10:
                list_re.append(key)
            for val in value:
                if isinstance(val, dict):
                    array_list(val, list_re)
        if isinstance(value, dict):
            array_list(value, list_re)
    return list_re


def to_count_a(url, panel):
    """To count number of a in an html."""
    tag_list = []
    source_code = requests.get(url).text
    soup = BeautifulSoup(source_code, 'html.parser')
    if panel == 'panel002':
        dicts = json.loads(str(soup))
        list_re = []
        final = array_list(dicts, list_re)
        return len(final)
    elif panel == 'panel003':
        for tag in soup.find_all():
            tag_list.append(tag.name)
        return len(tag_list) / 100
    elif panel == 'panel001':
        texts = soup.findAll(text=True)
        visible_texts = filter(tag_visible, texts)
        texts = u"".join(t.strip() for t in visible_texts)
        number = texts.lower().count('a')
        return number / 100
