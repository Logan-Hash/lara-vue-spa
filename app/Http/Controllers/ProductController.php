<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductStoreRequest;
use App\Http\Requests\ProductUpdateRequest;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::orderBy('id','desc')->get();
    }

    public function store(ProductStoreRequest $request)
    {
        $product = Product::create($request->only('name','price'));
        return $product;
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(ProductUpdateRequest $request,Product $product)
    {
        $product->update($request->only('name','price'));
        return $product;
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return $product;
    }
}
