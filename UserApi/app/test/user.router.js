const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../src/index')
const db = require('../src/dbClient')
const userController = require('../src/controllers/user')

chai.use(chaiHttp)

describe('User REST API', () => {
  
  after(() => {
    app.close()
    db.end()
  })

    /** Deletes any existing user 'sergkudinov' before calling API
     */
    describe('Delete', () => {
    it('deletes the sergkudinov user if it already exists', (done) => {
      userController.delete('sergkudinov', (err, result) => {
        try {
          // If the user was not found, result will be undefined or null
          if (err && err.message !== 'User not found') {
            // Unexpected error
            return done(err);
          }

          // If deleted, we expect a status
          if (result) {
            //console.log('Result:', result);
            chai.expect(result).to.have.property('status', 'deleted');
            chai.expect(result.user).to.include({ username: 'sergkudinov' });
          }

          // In either case (deleted or not found), test passes
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });

  describe('POST /user', () => {

    it('create a new user', () => {
  	const user = {
    		username: 'sergkudinov',
    		firstname: 'Sergei',
    		lastname: 'Kudinov'
  	};

  	return chai.request(app)
    	.post('/user')
    	.send(user)
    	.then((res) => {
      	//console.log('Result:', res.body);

      	chai.expect(res).to.have.status(201);
      	chai.expect(res.body.status).to.equal('success');
      	chai.expect(res).to.be.json;
    	})
    	.catch((err) => {
      	// Log the error and rethrow so Mocha knows the test failed
      	console.error('Test failed:', err.response?.body || err.message);
      	throw err;
    	});
    });

    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  describe('GET /user', () => {
    
    it('get an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Create a user
      userController.create(user, (err, result) => {
        
	if (err && err.message !== 'User already exists') return done(err);

	// Get the user
        chai.request(app)
          .get('/user/' + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body.status).to.equal('success')
            chai.expect(res).to.be.json
            done()
          })
          .catch((err) => {
             throw err
          })
      })
    })
    
    it('can not get a user when it does not exis', (done) => {
      chai.request(app)
        .get('/user/invalid')
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })
})
