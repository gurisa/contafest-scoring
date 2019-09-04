describe('Test Aggregate option', function () {
    it('select with agregate - min', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                min: "Price"
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('min(Price)').to.equal(2.5)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - max', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                max: "Price"
            },
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('max(Price)').to.equal(263.5)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - sum', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                sum: "Price"
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('sum(Price)').to.equal(2222.71)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - count', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                count: "Price"
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('count(Price)').to.equal(77)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - avg', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                avg: "Price"
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('avg(Price)').to.equal(28.866363636363637);
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - min,max', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                min: "Price",
                max: "Price"
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('min(Price)').to.equal(2.5)
            expect(results[0]).to.have.property('max(Price)').to.equal(263.5)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - min,max,avg', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                min: "Price",
                max: "Price",
                avg: "Price"
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('min(Price)').to.equal(2.5)
            expect(results[0]).to.have.property('max(Price)').to.equal(263.5)
            expect(results[0]).to.have.property('avg(Price)').to.equal(28.866363636363637)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

    it('select with agregate - min,max,avg,count', function (done) {
        con.select({
            from: 'Products',
            aggregate: {
                min: "Price",
                max: "Price",
                avg: "Price",
                count: ["Price","ProductName"]
            }
        }).then(function (results) {
            expect(results).to.be.an('array').length(1);
            expect(results[0]).to.have.property('min(Price)').to.equal(2.5)
            expect(results[0]).to.have.property('max(Price)').to.equal(263.5)
            expect(results[0]).to.have.property('avg(Price)').to.equal(28.866363636363637)
            expect(results[0]).to.have.property('count(Price)').to.equal(77)
            expect(results[0]).to.have.property('count(ProductName)').to.equal(77)
            done();
        }).catch(function (err) {
            done(err);
        })
    });

});