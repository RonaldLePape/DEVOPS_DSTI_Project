const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
    describe('Delete', () => {
    it('deletes the test user "sergkudinov" if it exists', (done) => {

      const user = {
        username: 'sergkudinov',
      }

      userController.delete(user, (err, result) => {
        try {
          // If the user was not found, result will be undefined or null
          if (err && err.message !== 'User not found') {
            // Unexpected error
            return done(err);
          }

          // If deleted, we expect a status
          if (result) {
            //console.log('Result:', result);
            expect(result).to.have.property('status', 'deleted');
            expect(result.user).to.include({ username: 'sergkudinov' });
          }

          // In either case (deleted or not found), test passes
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
  

  describe('Create', () => {

    it('creates a new test user "sergkudinov"', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
     userController.create(user, (err, result) => {
        try {
          expect(err).to.equal(null);
          expect(result).to.include({
              username: 'sergkudinov',
              firstname: 'Sergei',
              lastname: 'Kudinov'
          });
          done();
        } catch (e) {
          done(e); // let Mocha report the assertion failure
        }
     });

    })

    it('passes wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoids creating an existing user', (done)=> {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Create a user
      userController.create(user, () => {
        // Create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
    })
  })

  describe('Get', ()=> {
	  

    it('gets a test user "sergkudinov" by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
        // Get an existing test user
        userController.get(user.username, (err, result) => {
          //console.log('Result:', result);
	  expect(err).to.be.equal(null)
          expect(result).to.be.deep.equal({
            username: 'sergkudinov',
            firstname: 'Sergei',
            lastname: 'Kudinov'
          })
          done()
        })
    })
  
    it('can not get a user when it does not exist', (done) => {
      userController.get('invalid', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  
  })


})
