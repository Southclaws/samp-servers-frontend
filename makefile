VERSION := $(shell cat VERSION)

build:
	docker build -t southclaws/samp-servers-frontend:$(VERSION) \
		--build-arg app_env=production \
		.

push:
	docker push southclaws/samp-servers-frontend:$(VERSION) 

run:
	-docker kill samp-servers-frontend
	-docker rm samp-servers-frontend
	docker run \
		--name samp-servers-frontend \
		-p 3000:3000 \
		-d \
		southclaws/samp-servers-frontend:$(VERSION)

run-prod:
	-docker kill samp-servers-frontend
	-docker rm samp-servers-frontend
	docker run \
		--name samp-servers-frontend \
		--restart on-failure \
		-p 7792:80 \
		-d \
		southclaws/samp-servers-frontend:$(VERSION)
