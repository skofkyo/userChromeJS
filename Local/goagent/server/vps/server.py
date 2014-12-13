#!/usr/bin/env python
# coding:utf-8

raise NotImplementedError('Coming soon...')

__version__ = '3.1.18'

import os
import sys
import sysconfig

reload(sys).setdefaultencoding('UTF-8')
sys.dont_write_bytecode = True
sys.path = [(os.path.dirname(__file__) or '.') + '/packages.egg/noarch'] + sys.path + [(os.path.dirname(__file__) or '.') + '/packages.egg/' + sysconfig.get_platform().split('-')[0]]

try:
    __import__('gevent.monkey', fromlist=['.']).patch_all()
except (ImportError, SystemError):
    sys.exit(sys.stderr.write('please install python-gevent\n'))

import collections
import ConfigParser
import Queue
import random
import re
import socket
import thread
import time

import gevent
import gevent.queue
import gevent.server
import gevent.socket

from proxylib import LRUCache
from proxylib import CertUtil
from proxylib import dnslib_resolve_over_tcp
from proxylib import dnslib_resolve_over_udp
from proxylib import dnslib_record2iplist
from proxylib import SSLConnection
from proxylib import ProxyUtil
from proxylib import inflate
from proxylib import deflate
from proxylib import get_dnsserver_list
from proxylib import spawn_later
from proxylib import AuthFilter
from proxylib import AdvancedProxyHandler
from proxylib import BlackholeFilter
from proxylib import UserAgentFilter
from proxylib import URLRewriteFilter
from proxylib import BaseProxyHandlerFilter
from proxylib import CipherFileObject
from proxylib import RC4Cipher
from proxylib import FakeHttpsFilter
from proxylib import ForceHttpsFilter
from proxylib import StaticFileFilter
from proxylib import get_process_list
from proxylib import get_uptime
from proxylib import LocalProxyServer
from proxylib import RangeFetch
from proxylib import SimpleProxyHandlerFilter
from proxylib import SimpleProxyHandler




class VPSProxyHandler(AdvancedProxyHandler):
    """GAE Proxy Handler"""
    handler_filters = [SimpleProxyHandlerFilter()]
    urlfetch_class = MyURLFetch

    def first_run(self):
        """GAEProxyHandler setup, init domain/iplist map"""
        logging.info('resolve common.IPLIST_ALIAS names=%s to iplist', list(common.IPLIST_ALIAS))
        common.resolve_iplist()

    def gethostbyname2(self, hostname):
        for postfix in ('.appspot.com', '.googleusercontent.com'):
            if hostname.endswith(postfix):
                host = common.HOST_MAP.get(hostname) or common.HOST_POSTFIX_MAP[postfix]
                return common.IPLIST_ALIAS.get(host) or host.split('|')
        return AdvancedProxyHandler.gethostbyname2(self, hostname)

    def handle_urlfetch_error(self, fetchserver, response):
        pass


def pre_start():
    if True:
        VPSProxyHandler.handler_filters.insert(0, HostsFilter())
    if True:
        VPSProxyHandler.handler_filters.insert(0, URLRewriteFilter())
    if common.FAKEHTTPS_SITES:
        VPSProxyHandler.handler_filters.insert(0, FakeHttpsFilter(common.FAKEHTTPS_SITES, common.NOFAKEHTTPS_SITES))
    if common.FORCEHTTPS_SITES:
        VPSProxyHandler.handler_filters.insert(0, ForceHttpsFilter(common.FORCEHTTPS_SITES, common.NOFORCEHTTPS_SITES))
    if common.USERAGENT_ENABLE:
        VPSProxyHandler.handler_filters.insert(0, UserAgentFilter(common.USERAGENT_STRING))
    if common.AUTH:
        VPSProxyHandler.handler_filters.insert(0, AuthFilter('', ''))


def main():
    global __file__
    __file__ = os.path.abspath(__file__)
    if os.path.islink(__file__):
        __file__ = getattr(os, 'readlink', lambda x: x)(__file__)
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    logging.basicConfig(level=logging.DEBUG if common.LISTEN_DEBUGINFO else logging.INFO, format='%(levelname)s - %(asctime)s %(message)s', datefmt='[%b %d %H:%M:%S]')
    pre_start()
    sys.stderr.write(common.info())

    HandlerClass = VPSProxyHandler
    server = LocalProxyServer((common.LISTEN_IP, common.LISTEN_PORT), HandlerClass)
    server.serve_forever()

if __name__ == '__main__':
    main()
