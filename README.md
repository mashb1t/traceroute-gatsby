# Traceroute

## How to use

Due to the nature of traceroute the traceroute-server from which traceroute is executed has to be run in your network to get an accurate result.

After starting the server you can simply enter the domain / ip address to traceroute and see the visualization after the command has finished on the server.

## Setup

### Docker

1.  **Set up and start traceroute-server**

    ```shell
    git clone https://github.com/mashb1t/traceroute-server
    cd traceroute-server
    docker-compose build
    docker-compose up -d
    ```

    The server is now running at http://127.0.0.1:3000!

2.  **(optional) Setup and start traceroute-gatsby**

    You don't have to set up the page to use the project.

    ```shell
    git clone https://github.com/mashb1t/traceroute-gatsby
    cd traceroute-gatsby
    docker-compose build
    docker-compose up -d
    ```

    Gatsby is now running at http://127.0.0.1:8000!

### Native

1.  **Set up and start traceroute-server**

    ```shell
    git clone https://github.com/mashb1t/traceroute-server
    cd traceroute-server
    npm install
    node server.js
    ```
    
    The server is now running at http://127.0.0.1:3000!

2.  **(optional) Setup and start traceroute-gatsby**

    ```shell
    git clone https://github.com/mashb1t/traceroute-gatsby
    cd traceroute-gatsby
    npm install
    npm run develop
    ```

    Gatsby is now running at http://127.0.0.1:8000!