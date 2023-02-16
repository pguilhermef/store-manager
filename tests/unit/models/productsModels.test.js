const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models/index')

const connection = require('../../../src/models/connection');
const { allProductsResponse } = require('../../../__tests__/_dataMock')


describe('Testa a model de products', () => {
  it('Lista todas os produtos corretamente', async () => {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    const result = await productsModels.getAllProductsModel()
    expect(result).to.be.deep.equal(allProductsResponse)
  });

  it('Lista produtos buscados por ID corretamente', async () => {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]])
    const result = await productsModels.getProductByIdModel(1);
    expect(result).to.be.deep.equal(allProductsResponse[0])
  })

  afterEach(() => {
    sinon.restore();
  })
});
