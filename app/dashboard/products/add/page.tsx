"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AddProductPage() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    batchNumber: "",
    brand: "",
    expiryDate: "",
    manufacturerName: "",
    factoryLocation: "",
    productionDate: "",
    category: "",
  })

  const [productImage, setProductImage] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setProductData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setProductImage(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Add New Products</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Generate QR Code</Button>
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
            Download QR Code
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Product Information</CardTitle>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7"
                  />
                </svg>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="productName">Name Product</Label>
                <Input
                  id="productName"
                  value={productData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                  id="productDescription"
                  value={productData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="batchNumber">Batch Number</Label>
                  <Input
                    id="batchNumber"
                    value={productData.batchNumber}
                    onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select onValueChange={(value) => handleInputChange("brand", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hollandia">Hollandia</SelectItem>
                      <SelectItem value="chivita">Chivita</SelectItem>
                      <SelectItem value="caprisonne">Caprisonne</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative mt-1">
                    <Input
                      id="expiryDate"
                      type="date"
                      value={productData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    />
                    <svg
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manufacturing Details Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Manufacturing Details</CardTitle>
              <Button variant="ghost" size="sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7"
                  />
                </svg>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="manufacturerName">Manufacturer Name</Label>
                <Input
                  id="manufacturerName"
                  value={productData.manufacturerName}
                  onChange={(e) => handleInputChange("manufacturerName", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="factoryLocation">Factory Location</Label>
                <Input
                  id="factoryLocation"
                  value={productData.factoryLocation}
                  onChange={(e) => handleInputChange("factoryLocation", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="productionDate">Production Date</Label>
                <div className="relative mt-1">
                  <Input
                    id="productionDate"
                    type="date"
                    value={productData.productionDate}
                    onChange={(e) => handleInputChange("productionDate", e.target.value)}
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Product Image & Manufacturing Details */}
        <div className="space-y-6">
          {/* Product Image Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Product Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                {productImage ? (
                  <div className="space-y-2">
                    <img
                      src={URL.createObjectURL(productImage) || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-gray-600">{productImage.name}</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-500">Upload product image</p>
                  </div>
                )}
              </div>

              <div className="border-2 border-dashed border-blue-300 rounded-lg p-4 text-center bg-blue-50">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  <div className="w-8 h-8 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">Click to upload</p>
                </label>
                <input id="imageUpload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            </CardContent>
          </Card>

          {/* Manufacturing Details Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Manufacturing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="productionDateSummary">Production Date</Label>
                <Input
                  id="productionDateSummary"
                  type="date"
                  value={productData.productionDate}
                  onChange={(e) => handleInputChange("productionDate", e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add Category</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
