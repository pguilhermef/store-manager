const { expect } = require('chai');
const sinon = require('sinon');
const { productsModels } = require('../../../src/models/index')

const connection = require('../../../src/models/connection');
const { allProductsResponse } = require('../../../__tests__/_dataMock')


describe('Model de Products', () => {
  describe('Listagem de produtos', () => {
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
  });

  describe('Criação de produtos', () => {
    it('Cria um novo produto com sucesso', async () => {
      sinon.stub(connection, 'execute').resolves([{ insertId: 42 }])
      const result = await productsModels.createNewProductModel('Action figure Luffy')
      expect(result).to.be.deep.equal(42)
    });
  });


  afterEach(() => {
    sinon.restore();
  })
});
