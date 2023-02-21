const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { productsServices } = require('../../../src/services/index');
const { productsControllers } = require('../../../src/controllers/index');

const { allProductsResponse } = require('../../../__tests__/_dataMock');
const { afterEach } = require('mocha');

describe('Testa o controller de products', () => {
  it('Lista todas os produtos e retorna o status 200', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns()

    sinon
      .stub(productsServices, 'getAllProductsService').resolves({ type: null, message: allProductsResponse });
    
    await productsControllers.getAllProductsController(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse);
  });

  it('Lista produtos buscados por ID corretamente', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsServices, 'getProductByIdService').resolves({ type: null, message: allProductsResponse[0] })
    
    await productsControllers.getProductByIdController(req, res)

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse[0])
  })

  afterEach(() => {
    sinon.restore();
  })
});
