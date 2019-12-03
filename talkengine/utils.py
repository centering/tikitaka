#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Ownership: Piglet team, AI Center, SK Telecom

import re

repeatchars_pattern = re.compile('(\w)\\1{3,}')


def normalize_text(text: str) -> str:
    text = repeatchars_pattern.sub('\\1' * 3, text)
    return text


class KeywordPatternMatcher:
    def __init__(self):
        pass

    def predict(self, text, pattern_list):
        matching = False
        p = ''
        for pattern in pattern_list:
            matching, p = kmp_string_matcher(text, pattern)
            if matching:
                break
        return matching, p


def kmp_string_matcher(text: str, pattern: str):
    matching = False
    text_size = len(text)
    pattern_size = len(pattern)

    prefix_suffix_list = compute_prefix_func(pattern)
    q = 0

    for i in range(text_size):
        while (q > 0) & (pattern[q] != text[i]):
            q = prefix_suffix_list[q]
        if pattern[q] == text[i]:
            q += 1
        if q == pattern_size:
            q = prefix_suffix_list[q-1]
            matching = True
    return matching, pattern


def compute_prefix_func(pattern: str):
    pattern_size = len(pattern)
    prefix_suffix_list = [0] * pattern_size
    prefix_suffix_list[0] = 0
    j = 0

    for i in range(1, pattern_size):
        while (j > 0) & (pattern[i] != pattern[j]):
            j = prefix_suffix_list[j-1]
        if pattern[i] == pattern[j]:
            j += 1
            prefix_suffix_list[i] = j
    return prefix_suffix_list