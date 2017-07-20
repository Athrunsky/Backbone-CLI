module.exports = {
    getGroup: function (req, res){
        var group = [{
            "id" : "325dbf13-8e93-11e6-8293-507b9dcc677a",
            "name" : "分组1",
            "remark" : ""
        }, {
            "id" : "72047065-8e93-11e6-8293-507b9dcc677a",
            "name" : "分组2",
            "remark" : ""
        }];
        res.send(group);
    }

};
