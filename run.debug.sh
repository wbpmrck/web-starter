#!/bin/bash

echo 'prepare staring service in [dev] mode,has debug log'

export NODE_DEBUG=debug,info,error

node --harmony index.js

