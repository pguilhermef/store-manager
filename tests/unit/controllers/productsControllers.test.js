const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = require('chai');
chai.use(sinonChai);

const { productsServices } = require('../../../src/services/index');
const { productsControllers } = require('../../../src/controllers/index');

const { allProductsResponse } = require('../../../__tests__/_dataMock');
const { afterEach } = require('mocha');

describe('Controller de Products', () => {
  describe('Listagem de produtos', () => {
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

      sinon.stub(productsServices, 'getProductByIdService').resolves({ type: null, message: allProductsResponse[0] })
      
      await productsControllers.getProductByIdController(req, res)
  
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0])
    })
  
    it('Caso não encontre o produto buscado, retorna um 404', async () => {
      const res = {};
      const req = {
        params: { id: 1 },
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsServices, 'getProductByIdService').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found'})
      
      await productsControllers.getProductByIdController(req, res)
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" })
    })
  });

  describe('Criação de Produtos', () => {
    it('Retorna um erro ao passar um valor inválido na requisição', async () => {
      const res = {};
      const req = {
        body: { name: 'pimba' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'createNewProductService').resolves({ type: 'INVALID_VALUE', message: '"name" must be a string' })

      await productsControllers.createNewProductController(req, res);

      expect(res.status).to.have.been.calledWith(422);
    });

    it('Cria um produto com sucesso', async () => {
      const res = {};
      const req = {
        body: { name: 'Martelo de Thor' }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsServices, 'createNewProductService').resolves({ type: null, message: allProductsResponse[0] })
      
      await productsControllers.createNewProductController(req, res)

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0])
    });
  });

  afterEach(() => {
    sinon.restore();
  })
});
