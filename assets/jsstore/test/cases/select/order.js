describe('Test Select with order', function () {

    it('order by country ', function (done) {
        con.select({
            from: 'Customers',
            limit: 10,
            order: {

            }
        }).then(function (results) {
            done(results);
        }).catch(function (err) {
            const error = { "message": "Column 'undefined' in order query does not exist", "type": "column_not_exist" };
            expect(err).to.be.an('object').eql(error);
            done();
        })
    })

    it('order by country ', function (done) {
        con.select({
            from: 'Customers',
            limit: 10,
            order: {
                by: 'Country'
            }
        }).then(function (results) {
            var countries = ["Argentina", "Argentina", "Argentina", "Austria", "Austria",
                "Belgium", "Belgium", "Brazil", "Brazil", "Brazil"];
            expect(results).to.be.an('array').length(10);
            results.forEach(function (result, i) {
                expect(result.Country).to.be.equal(countries[i]);
            });
            done();
        }).catch(function (err) {
            done(err);
        })
    })

    it('order having type asc with limit ', function (done) {
        con.select({
            from: 'Products',
            limit: 1,
            where: {
                SupplierID: {
                    '>': 18
                }
            },
            order: {
                by: 'Price',
                type: 'asc'
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(1);
                var product = results[0];
                expect(product.Price).to.be.eql(7)
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('order having type desc with limit ', function (done) {
        con.select({
            from: 'Products',
            limit: 1,
            where: {
                SupplierID: {
                    '>': 18
                }
            },
            order: {
                by: 'Price',
                type: 'desc'
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(1);
                var product = results[0];
                expect(product.Price).to.be.eql(55)
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('invalid order column test', function (done) {
        con.select({
            from: 'Products',
            limit: 1,
            order: {
                by: 'invalid column',
                type: 'asc'
            }
        }).
            then(function (err) {
                done(err);
            }).
            catch(function (err) {
                var error = {
                    "message": "Column 'invalid column' in order query does not exist",
                    "type": "column_not_exist"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            })
    });

    it('invalid order column test with where query', function (done) {
        con.select({
            from: 'Products',
            limit: 1,
            where: {
                SupplierID: {
                    '>': 18
                }
            },
            order: {
                by: 'invalid column',
                type: 'asc'
            }
        }).
            then(function (err) {
                done(err);
            }).
            catch(function (err) {
                var error = {
                    "message": "Column 'invalid column' in order query does not exist",
                    "type": "column_not_exist"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            })
    });

    it('things table test', function (done) {
        con.select({
            from: 'things',
            order: {
                by: 'value',
                type: 'asc',
                idbSorting: false
            }
        }).
            then(function (results) {
                results = results.map(function (val) {
                    return val.value;
                });
                expect(results).to.be.an('array').length(10);
                var expecteResult = ['Bayou', 'bite', 'caYman', 'crocodilian', 'Eggs',
                    'gator', 'Grip', 'grips', 'Jaw', 'nest'
                ];
                expect(results).to.deep.equal(expecteResult);
                // var product = results[0];
                // expect(product.Price).to.be.eql(7)
                done();
            }).
            catch(done)
    });

    it('order by asc for date', function (done) {
        con.select({
            from: 'Employees',
            order: {
                by: 'birthDate',
                type: 'asc',
                idbSorting: false
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(34);
                var isSorted = true;
                results.every(function (value, index) {
                    const nextVal = results[index + 1];
                    if (nextVal != null && value.birthDate.getTime() > nextVal.birthDate.getTime()) {
                        isSorted = false;
                    }
                    return isSorted;
                })
                if (isSorted === true) {
                    done();
                } else {
                    done("birth date is not sorted");
                }

            }).
            catch(function (err) {
                done(err);
            })
    });

    it('order by desc for date', function (done) {
        con.select({
            from: 'Employees',
            order: {
                by: 'birthDate',
                type: 'desc',
                idbSorting: false
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(34);
                var isSorted = true;
                results.every(function (value, index) {
                    const nextVal = results[index + 1];
                    // check for wrong condition
                    if (nextVal != null && value.birthDate.getTime() < nextVal.birthDate.getTime()) {
                        isSorted = false;
                    }
                    return isSorted;
                })
                if (isSorted === true) {
                    done();
                } else {
                    done("birth date is not sorted");
                }

            }).
            catch(function (err) {
                done(err);
            })
    });
});