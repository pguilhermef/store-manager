const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index')
const { productsModels } = require('../../../src/models/index')

const { allProductsResponse } = require('../../../__tests__/_dataMock')


describe('Testa o service de products', () => {
  it('Lista todas os produtos corretamente', async () => {
    sinon.stub(productsModels, 'getAllProductsModel').resolves(allProductsResponse);
    const result = await productsServices.getAllProductsService();
    expect(result.message).to.be.deep.equal(allProductsResponse)
  })

  it('Lista produtos buscados por ID corretamente', async () => {
    sinon.stub(productsModels, 'getProductByIdModel').resolves(allProductsResponse[0])
    const result = await productsServices.getProductByIdService(1)
    expect(result.message).to.be.deep.equal(allProductsResponse[0])
  });

  it('Caso não encontre o produto buscado, retorna um 404', async () => {
    sinon.stub(productsModels, 'getProductByIdModel').resolves(undefined)
    const result = await productsServices.getProductByIdService(8)
    expect(result.message).to.be.deep.equal('Product not found')
  })

  afterEach(() => {
    sinon.restore();
  })
});
