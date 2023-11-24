#!/bin/bash

build_wasm() {
    url=$1
    dirname=$2
    binaryname=$3
    tag=$4

    cd tmp
    git clone $url
    cd $dirname
    git checkout $tag
    GOOS=wasip1 GOARCH=wasm go build -o $binaryname.wasm
    mv $binaryname.wasm ../../public/wasm
    cd ../..
}

# NOTE: use custom function because entrypoint is not on the root
build_gojq_wasm() {
    cd tmp
    git clone https://github.com/itchyny/gojq.git
    cd gojq
    git checkout v0.12.13
    cd cmd/gojq
    GOOS=wasip1 GOARCH=wasm go build -o jq.wasm
    mv jq.wasm ../../../../public/wasm
    cd ../../../..
}


mkdir -p tmp

build_wasm https://github.com/benhoyt/goawk.git goawk awk v1.25.0
build_wasm https://github.com/Syuparn/Pangaea.git Pangaea pangaea v0.12.1
build_wasm https://github.com/Syuparn/tmplscript.git tmplscript gotemplate v0.7.0

build_gojq_wasm
