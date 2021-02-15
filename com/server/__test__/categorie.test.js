const CatTest = require('../src/routes/categorie-route');

test('Add', ()=>{
    expect(CatTest('ok')).toBe('ok');
})