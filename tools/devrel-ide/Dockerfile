ARG APLINE_VERSION=3.12
FROM mcr.microsoft.com/vscode/devcontainers/base:alpine-${APLINE_VERSION}

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN (cd /home/vscode && git clone https://github.com/apigee/devrel.git)
# # Adding aac cli
RUN ln -s /home/vscode/devrel/tools/another-apigee-client/aac /usr/bin/aac
# # Adding proxy generator
RUN ln -s /home/vscode/devrel/references/proxy-template/generate-proxy.sh /usr/bin/generate-apigee-proxy

## Probably want to use extensions from the official repo instead
ADD extensions /home/vscode/.vscode-server/extensions
RUN chown -R $USER_UID:$USER_GID  /home/vscode
