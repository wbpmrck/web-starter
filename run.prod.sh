#!/bin/bash

echo 'prepare staring service in [prod] mode,no debug log'

export NODE_DEBUG=info,error

node --harmony index.js

