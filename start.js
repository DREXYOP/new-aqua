const { ClusterManager } = require('discord-hybrid-sharding');

const manager = new ClusterManager(`./src/index.js`, {
    totalShards: "auto", 
    shardsPerClusters: 5,
    totalClusters: 7,
    mode: 'process',
    token: require("./src/config.json").token,
});

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ timeout: -1 });
