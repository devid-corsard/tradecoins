#!/usr/bin/env bash
set -x
set -eo pipefail

pm2 start ~/rustapps/tradecoins_gha/ecosystem.config.js
