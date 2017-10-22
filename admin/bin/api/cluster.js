// const cluster = require('cluster');
// const http = require('http');

// if(cluster.isMaster){
//     console.log(`主进程  ${process.pid} 正在运行...`);
//     let numReqs = 0;
//     setInterval(() => {
//         console.log(`numReqs = ${numReqs}`);
//     }, 1000);
//     function messageHandler(msg){
//         if(msg.cmd && msg.cmd === 'notifyRequest'){
//             numReqs += 1;
//         }
//     }
//     const cpuNum = require('os').cpus().length;
//     for(let i = 0; i < cpuNum; i++){
//         cluster.fork();
//     }
//     for(const id in cluster.workers){
//         console.log(id);
//         cluster.workers[id].on('message', messageHandler)
//     }
//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`工作进程 ${worker.process.pid} 已退出...`);
//     });
// }else{
//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('Hello world!')
//     }).listen(3000);
//     process.send({ cmd: 'notifyRequest' });
//     console.log(`工作进程 ${process.pid} 启动...`);
    
// }

// const { spawn } = require('child_process');
// const bat = spawn('cmd.exe', ['/', 'my.bat']);
// bat.stdout.on('data', (data) => {
//     console.log(data.toString());
// })
// bat.stderr.on('data', (data) => {
//     console.log(data.toString());
// })
// bat.on('exit', (code) => {
//     console.log(`子进程退出码：${code}`);
// })

const { exec } = require('child_process');
const child = exec('bin/api/cluster.js', (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});