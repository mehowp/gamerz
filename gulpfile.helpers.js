module.exports = function() {

    var helperFunctions = {

        logOnChange: function(file, cutPath, type) {
            if (file.path) {
                file = file.path;
            }

            file = file.replace(cutPath, '');
            var isEslint = function() {

                if (type) {
                    return '';
                }
                return chalk.dim(' has changed');
            }
            var output = chalk.cyan('File ' + chalk.dim(file) + isEslint());
            return output;
        },

        joinPath: function(matchPath) {
            return path.join(rootdir, path.normalize(matchPath));
        }

    }

    return helperFunctions;
}
