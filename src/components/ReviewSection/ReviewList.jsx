import React from 'react'
import ContentWrapper from '../Layout/ContentWrapper'

const ReviewList = () => {
  return (
    <div>
     
  <div class=" rounded-lg my-6">
    <h2 class="text-2xl font-semibold text-gray-900 mb-4">Prar's reviews</h2>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" src="https://placehold.co/512x512" alt="Reviewer avatar"/>
          <div class="ml-4">
            <div class="text-lg font-medium text-gray-900">Reinold</div>
            <div class="text-yellow-400 text-sm">★★★★★</div>
          </div>
        </div>
        <div class="text-sm text-gray-500">26 Oct 23</div>
      </div>
      <div class="text-gray-700">Great as always, item returned as borrowed</div>
      <div class="border-b border-gray-300"></div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" src="https://placehold.co/512x512" alt="Reviewer avatar"/>
          <div class="ml-4">
            <div class="text-lg font-medium text-gray-900">Dayo</div>
            <div class="text-yellow-400 text-sm">★★★★★</div>
          </div>
        </div>
        <div class="text-sm text-gray-500">24 Oct 23</div>
      </div>
      <div class="border-b border-gray-300"></div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" src="https://placehold.co/512x512" alt="Reviewer avatar"/>
          <div class="ml-4">
            <div class="text-lg font-medium text-gray-900">Jack</div>
            <div class="text-yellow-400 text-sm">★★★★★</div>
          </div>
        </div>
        <div class="text-sm text-gray-500">24 Oct 23</div>
      </div>
    </div>

    <div class="mx-auto pt-4 text-center">
      <button class="md:w-1/3 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        See all reviews
      </button>
    </div>
  </div> 
    </div>
  )
}

export default ReviewList
