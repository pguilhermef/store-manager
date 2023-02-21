const { expect } = require('chai');
const sinon = require('sinon');
const { productsServices } = require('../../../src/services/index')
const { productsModels } = require('../../../src/models/index')

const { allProductsResponse } = require('../../../__tests__/_dataMock')


describe('Service de Products', () => {
  describe('Listagem de produtos', () => {
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

    it('Retorna um erro 422 ao colocar um id que não seja numérico', async () => {
      const result = await productsServices.getProductByIdService('a')
      expect(result.type).to.be.deep.equal('INVALID_VALUE')
      expect(result.message).to.be.deep.equal('"id" must be a number')
    })
  });

  describe('Criação de produtos', () => {
    it('Retorna um erro ao passar um nome inválido', async () => {
      const result = await productsServices.createNewProductService('LOL');
      expect(result.type).to.equal('string.min');
      expect(result.message).to.equal('"name" length must be at least 5 characters long')
    });

    it('Cadastra um produto com valores válidos', async () => {
      sinon.stub(productsModels, 'createNewProductModel').resolves(1)
      sinon.stub(productsModels, 'getProductByIdModel').resolves(allProductsResponse[0])

      const result = await productsServices.createNewProductService('Martelo de Thor');

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(allProductsResponse[0])
    });
  });

  afterEach(() => {
    sinon.restore();
  })
});
