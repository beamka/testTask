#!/usr/bin/env bash
npm run build:prod testTask  && cat dist/testTask/runtime.js dist/testTask/main.js dist/testTask/polyfills.js> preview/test.js

