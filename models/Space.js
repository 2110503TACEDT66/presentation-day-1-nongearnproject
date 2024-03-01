const sql = require("../config/spaceDB");

const Space = function(space) {
    this.id = space.id;
    this.name = space.name;
    this.tel = space.tel;
};

Space.getAll = result => {
    sql.query("SELECT * FROM space", (err, res) => {
        if(err) {
            console.log("error ", err);
            result(null, err);
            return;
        }
        console.log("space: ", res);
        result(null, res);
    });
};

module.exports = Space;