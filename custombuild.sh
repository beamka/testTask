#!/usr/bin/env bash
npm run build:prod test-task  && cat dist/test-task/runtime.js dist/test-task/main.js dist/test-task/polyfills.js> preview/test.js
