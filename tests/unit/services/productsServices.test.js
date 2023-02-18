const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index')
const { productsModels } = require('../../../src/models/index')

const { allProductsResponse } = require('../../../__tests__/_dataMock')


describe('Testa o service de products', () => {
  it('Lista todas os produtos corretamente', async () => {
    sinon.stub(productsModels, 'getAllProductsModel').resolves(allProductsResponse);
    const result = await productsServices.getAllProductsService();
    expect(result).to.be.deep.equal(allProductsResponse)
  })

  it('Lista produtos buscados por ID corretamente', async () => {
    sinon.stub(productsModels, 'getProductByIdModel').resolves(allProductsResponse[0])
    const result = await productsServices.getProductByIdService(1)
    expect(result).to.be.deep.equal(allProductsResponse[0])
  });

  it('Retorna um 404 caso não exista um produto com o ID buscado', async () => {});

  afterEach(() => {
    sinon.restore();
  })
});
