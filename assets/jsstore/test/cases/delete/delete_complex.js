describe('Test remove complex case', function () {
    it('remove with multiple or', function (done) {
        var where_query = {
                Country: 'Mexico',
                or: {
                    City: 'Madrid',
                    Address: {
                        like: '%a%'
                    }
                }
            },
            count;
        con.select({
            from: 'Customers',
            where: where_query
        }).then(function (results) {
            count = results.length;
        }).catch(function (err) {
            done(err);
        })

        con.remove({
            from: 'Customers',
            where: where_query
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' and (City='London' or Address like '%a%')", function (done) {
        var where_query = [{
                    Country: 'Mexico'
                },
                {
                    City: 'London',
                    or: {
                        Address: {
                            like: '%a%'
                        }
                    }
                }
            ],
            count;
        con.select({
            from: 'Customers',
            where: where_query
        }).then(function (results) {
            count = results.length;
        }).catch(function (err) {
            done(err);
        })

        con.remove({
            from: 'Customers',
            where: where_query
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it("sql - SELECT * FROM Customers WHERE Country='Mexico' or (City='London' and Address like '%a%')", function (done) {
        var where_query = [{
                    Country: 'Mexico'
                },
                {
                    or: {
                        City: 'London',
                        Address: {
                            like: '%a%'
                        }
                    }
                }
            ],
            count;
        con.select({
            from: 'Customers',
            where: where_query
        }).then(function (results) {
            count = results.length;
        }).catch(function (err) {
            done(err);
        })

        con.remove({
            from: 'Customers',
            where: where_query
        }).then(function (results) {
            expect(results).to.be.an('number').to.equal(count);
            done();
        }).catch(function (err) {
            done(err);
        })
    });


    it("sql - DELETE FROM Customers WHERE Country regex /Mexico|Brazil/", function (done) {
        var from  = 'Customers'
          , where = { Country: { regex: /Mexico|Brazil/ } }
          , count ;

        con.select({from, where})
           .then(function (results) {
            count = results.length;

            con.remove({from, where })
            .then(function (results) {
                expect(results).to.be.an('number').to.equal(count);
                done();
            }).catch(function (err) {
                done(err);
            })
        }).catch(function (err) {
            done(err);
        })
    });
});