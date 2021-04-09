(function(exports) {
    const { logger } = require('log-instance');
    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    var info;

    class RepoInfo {
        static async info() {
            if (!info) {
                const cmd = 'git config --list';
                const { stdout, stderr } = await exec(cmd);
                const remote = stdout.split('\n')
                    .filter(r=>/remote.origin.url/.test(r))[0];
                const remotePath = remote.split('=')[1]
                    .replace(/git@github.com:|https:..github.com./,'')
                    .replace('.git', '');
                let [ account, repository ] = remotePath.split('/');
                info = {
                    account,
                    repository,
                };
            }
            return info;
        }
    }

    module.exports = exports.RepoInfo = RepoInfo;

})(typeof exports === "object" ? exports : (exports = {}));
