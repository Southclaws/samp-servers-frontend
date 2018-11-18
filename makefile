VERSION := $(shell git describe --always --tags --dirty)

build:
	docker build -t southclaws/samp-servers-frontend:$(VERSION) \
		--build-arg app_env=production \
		.

push:
	docker push southclaws/samp-servers-frontend:$(VERSION)
	docker tag southclaws/samp-servers-frontend:$(VERSION) southclaws/samp-servers-frontend:latest
	docker push southclaws/samp-servers-frontend:latest

run:
	-docker kill samp-servers-frontend
	-docker rm samp-servers-frontend
	docker run \
		--name samp-servers-frontend \
		-p 3000:80 \
		southclaws/samp-servers-frontend:$(VERSION)
