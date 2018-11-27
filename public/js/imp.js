import * as child_process from "child_process";

namespace ExecfileSample {
    console.log("parent:" + process.pid);
    let child = child_process.execFile("ls", ["-l"], (error, stdout, stderr) => {

        if (error) {
            console.error("stderr", stderr);
            throw error;
        }
        console.log(stdout);
        console.log("pid: " +child.pid);
    });
}
