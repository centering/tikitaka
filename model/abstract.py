#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Ownership: Piglet team, AI Center, SK Telecom

import abc


class AbstractConvEngine(object):
    """
    Abstract class for Conversation Engine
    """
    __metaclass__ = abc.ABCMeta

    @abc.abstractmethod
    def predict(self, text):
        pass
