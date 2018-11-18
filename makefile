VERSION := $(shell git describe --tags --dirty --always)
SERVICE := $(shell basename $(shell pwd))
OWNER := southclaws

# -
# Docker
# -

build:
	docker build --no-cache -t $(OWNER)/$(SERVICE):$(VERSION) .

push:
	docker push $(OWNER)/$(SERVICE):$(VERSION)
	docker tag $(OWNER)/$(SERVICE):$(VERSION) $(OWNER)/$(SERVICE):latest
	docker push $(OWNER)/$(SERVICE):latest
