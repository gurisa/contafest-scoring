describe('Test Select Api', function () {
    it('select all', function (done) {
        con.select({
            from: 'Customers'
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(93);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('wrong table test', function (done) {
        con.select({
            from: 'Customer'
        }).
            catch(function (err) {
                console.log(err);
                var error = {
                    type: "table_not_exist",
                    message: "Table 'Customer' does not exist"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            })
    });

    it('select with skip', function (done) {
        con.select({
            from: 'Customers',
            skip: 10
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(83);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    // it('EnableSearch column test', function (done) {
    //     con.select({
    //         from: 'Customers',
    //         where: {
    //             Email: 'uk@gmail.com'
    //         }
    //     }).then(function () {
    //         done();
    //     }).catch(function (err) {
    //         var error = {
    //             "message": "Search is turned off for the Column 'Email'",
    //             "type": "enable_search_off"
    //         };
    //         expect(err).to.be.an('object').eql(error);
    //         done();
    //     })
    // });

    it('select with where', function (done) {
        con.select({
            from: 'Customers',
            where: {
                Country: 'Mexico'
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(5);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select without ignore case', function (done) {
        con.select({
            from: 'Customers',
            where: {
                Country: 'mexico'
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(0);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with ignore case', function (done) {
        con.select({
            from: 'Customers',
            ignoreCase: true,
            where: {
                Country: 'meXico'
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(5);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with ignore case with a number type', function (done) {
        con.select({
            from: 'Customers',
            ignoreCase: true,
            where: {
                Country: 'meXico',
                CustomerID: 3
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(1);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with ignore case with a number type and object value', function (done) {
        con.select({
            from: 'Customers',
            ignoreCase: true,
            where: {
                Country: 'meXico',
                CustomerID: {
                    '!=': 3
                }
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(4);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with distinct', function (done) {
        con.select({
            from: 'Customers',
            distinct: true,
            ignoreCase: true,
            where: {
                City: 'bhubaneswar'
            }
        }).
            then(function (results) {
                console.log(results);
                expect(results).to.be.an('array').length(1);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with or', function (done) {
        con.select({
            from: 'Customers',
            where: {
                Country: 'Mexico',
                or: {
                    City: 'Madrid'
                }
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(8);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with in', function (done) {
        con.select({
            from: 'Customers',
            where: {
                Country: {
                    in: ['Germany', 'France', 'UK']
                }
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(29);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with like -"%or%"', function (done) {
        con.select({
            from: 'Customers',
            where: {
                CustomerName: {
                    like: '%or%'
                }
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(11);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with like - "o%"', function (done) {
        con.select({
            from: 'Customers',
            where: {
                CustomerName: {
                    like: 'o%'
                }
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(3)
            var expected_id_list = [54, 55, 56];
            var id_list = [];
            results.forEach(function (element) {
                id_list.push(element.CustomerID);
            });
            expect(id_list).to.be.an('array').length(3).deep.equal(expected_id_list);
            done();

        }).catch(function (err) {
            done(err);
        });
    });

    it('select with like - "%o"', function (done) {
        con.select({
            from: 'Customers',
            where: {
                CustomerName: {
                    like: '%o'
                }
            }
        }).then(function (results) {
            var expected_id_list = [15, 21, 29, 46, 69, 73];
            var id_list = [];
            results.forEach(function (element) {
                id_list.push(element.CustomerID);
            });
            expect(id_list).to.be.an('array').length(6).deep.equal(expected_id_list);
            done();
        }).catch(function (err) {
            done(err);
        });
    });

    it('select with GroupBy', function (done) {
        con.select({
            from: 'Customers',
            groupBy: "Country"
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(22);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with order by', function (done) {
        con.select({
            from: 'Customers',
            Order: {
                by: 'Country',
                type: "desc"
            }
        }).
            then(function (results) {
                expect(results).to.be.an('array').length(93);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select with order by,limit 5, deep eql', function (done) {
        con.select({
            from: 'Customers',
            order: {
                by: 'Country',
                type: "desc"
            },
            limit: 5
        }).
            then(function (results) {
                var datas = [{
                    "CustomerID": 47,
                    "CustomerName": "LINO-Delicateses",
                    "ContactName": "Felipe Izquierdo",
                    "Address": "Ave. 5 de Mayo Porlamar",
                    "City": "I. de Margarita",
                    "PostalCode": "4980",
                    "Country": "Venezuela"
                }, {
                    "CustomerID": 46,
                    "CustomerName": "LILA-Supermercado",
                    "ContactName": "Carlos González",
                    "Address": "Carrera 52 con Ave. Bolívar #65-98 Llano Largo",
                    "City": "Barquisimeto",
                    "PostalCode": "3508",
                    "Country": "Venezuela"
                }, {
                    "CustomerID": 35,
                    "CustomerName": "HILARIÓN-Abastos",
                    "ContactName": "Carlos Hernández",
                    "Address": "Carrera 22 con Ave. Carlos Soublette #8-35",
                    "City": "San Cristóbal",
                    "PostalCode": "5022",
                    "Country": "Venezuela"
                }, {
                    "CustomerID": 33,
                    "CustomerName": "GROSELLA-Restaurante",
                    "ContactName": "Manuel Pereira",
                    "Address": "5ª Ave. Los Palos Grandes",
                    "City": "Caracas",
                    "PostalCode": "1081",
                    "Country": "Venezuela"
                }, {
                    "CustomerID": 89,
                    "CustomerName": "White Clover Markets",
                    "ContactName": "Karl Jablonski",
                    "Address": "305 - 14th Ave. S. Suite 3B",
                    "City": "Seattle",
                    "PostalCode": "98128",
                    "Country": "USA"
                }];
                expect(results).to.be.an('array').length(5).deep.equal(datas);
                done();
            }).
            catch(function (err) {
                done(err);
            })
    });

    it('select * from suppliers where PostalCode like - "43951%"', function (done) {
        con.select({
            from: 'Suppliers',
            where: {
                PostalCode: {
                    like: '43951%'
                }
            }
        }).
            then(function (results) {
                if (results.length > 0) {
                    expect(results).to.be.an('array').length(3);
                    done();
                } else {
                    done('no results');
                }
            }).
            catch(function (err) {
                done(err);
            });
    });

    it('select with where & key null', function (done) {
        con.select({
            from: 'Customers',
            where: {
                Country: null
            }
        }).
            catch(function (err) {
                var error = {
                    "message": "Null/undefined is not allowed in where. Column 'Country' has null",
                    "type": "null_value_in_where"
                };
                expect(err).to.be.an('object').eql(error);
                done();
            })
    });
});