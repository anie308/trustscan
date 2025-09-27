"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Sample product data
const products = [
  {
    id: 1,
    name: "Hollandia",
    batchNo: "HLD0930",
    category: "Drink",
    status: "Verified",
    image: "#10B981", // Green color
    qrCode: "Download",
  },
  {
    id: 2,
    name: "Chivita",
    batchNo: "CHV0925",
    category: "Beverage",
    status: "Verified",
    image: "#DC2626", // Red color
    qrCode: "Download",
  },
  {
    id: 3,
    name: "Caprisonne",
    batchNo: "CSP0812",
    category: "Juice",
    status: "Verified",
    image: "#D97706", // Orange color
    qrCode: "Download",
  },
  {
    id: 4,
    name: "Chivita Active",
    batchNo: "CHV8573",
    category: "Juice",
    status: "Verified",
    image: "#F59E0B", // Amber color
    qrCode: "Download",
  },
]

export default function ManageProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const renderPagination = () => {
    const pages = []

    // Previous button
    pages.push(
      <Button
        key="prev"
        variant="ghost"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        className="text-gray-600"
      >
        Previous
      </Button>,
    )

    // Page numbers
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "ghost"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? "bg-blue-600 text-white" : "text-gray-600"}
        >
          {i}
        </Button>,
      )
    }

    if (totalPages > 5) {
      pages.push(
        <span key="ellipsis" className="px-2 text-gray-500">
          ...
        </span>,
      )
    }

    // Last few pages
    for (let i = Math.max(4, totalPages - 1); i <= totalPages; i++) {
      if (i > 3) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "ghost"}
            size="sm"
            onClick={() => setCurrentPage(i)}
            className={currentPage === i ? "bg-blue-600 text-white" : "text-gray-600"}
          >
            {i}
          </Button>,
        )
      }
    }

    // Next button
    pages.push(
      <Button
        key="next"
        variant="ghost"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        className="text-gray-600"
      >
        Next
      </Button>,
    )

    return pages
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 bg-transparent">
            Download QR Code
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
          <Button variant="outline" className="text-gray-600 border-gray-300 bg-transparent">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-gray-600 border-gray-300 bg-transparent">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
            Sort
          </Button>
          <Button variant="outline" className="text-gray-600 border-gray-300 bg-transparent">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
              />
            </svg>
            Export
          </Button>
          <Link href="/dashboard/products/add">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Tokenized Products</CardTitle>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">260</div>
            <p className="text-xs text-gray-500 mt-1">vs last month +30 products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verified Scans</CardTitle>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">260</div>
            <p className="text-xs text-green-600 mt-1">+12% vs last month +12%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Product Lines</CardTitle>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">14</div>
            <p className="text-xs text-gray-500 mt-1">2 seasonal SKUs currently inactive</p>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-200">
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  PRODUCT IMAGE
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  PRODUCT NAME
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  BATCH NO
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  CATEGORY
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  STATUS
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  QR CODE
                </TableHead>
                <TableHead className="text-xs font-medium text-gray-500 uppercase tracking-wider py-4 px-6">
                  ACTION
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <TableCell className="py-4 px-6">
                    <div className="w-12 h-8 rounded" style={{ backgroundColor: product.image }} />
                  </TableCell>
                  <TableCell className="py-4 px-6 font-medium text-gray-900">{product.name}</TableCell>
                  <TableCell className="py-4 px-6 text-gray-600">{product.batchNo}</TableCell>
                  <TableCell className="py-4 px-6 text-gray-600">{product.category}</TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm text-gray-900">{product.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Download
                    </Button>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-600">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                          </svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Product</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete Product</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4">{renderPagination()}</div>
    </div>
  )
}
