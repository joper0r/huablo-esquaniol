#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Dec 17 15:09:08 2017

@author: gavvel
"""
import json,random
from apiclient.discovery import build



key = 'AIzaSyAg87BGv13UUEdYVGtRHJe4E-BQYjo7CDU'
deliveryOpts = ['super fast', 'fast', 'normal']
printType = [['Audiobook','Paperback','Hardcover'],['Audiobook','Hardcover'],['Paperback','Hardcover'],['Audiobook','Paperback'],['Audiobook'],['Hardcover'],['Paperback']]
subject = 'Horror'

# books api; build returns a resource
service = build('books', 'v1',developerKey = key)

request = service.volumes().list(source='public', q='subject:'+subject, startIndex = 0, maxResults=40 )

response = request.execute()


for item in response.get('items'):
    book = {}
    book['id'] = item['id']
    book['title'] = item.get('volumeInfo')['title']
    book['subtitle'] = item.get('volumeInfo').setdefault('subtitle',None)
    book['authors'] = item.get('volumeInfo').setdefault('authors','unknown')
    book['publisher'] = item.get('volumeInfo').setdefault('publisher',None)
    book['publishedDate'] = item.get('volumeInfo').setdefault('publishedDate',None)
    book['description'] = item.get('volumeInfo').setdefault('description',None)
    book['industryIdentifiers'] = item.get('volumeInfo').setdefault('industryIdentifiers',None)
    book['pageCount'] = item.get('volumeInfo').setdefault('pageCount',None)
    book['printType'] = printType[random.randint(0,6)]
    book['categories'] = item.get('volumeInfo').get('categories')
    book['imageLinks'] = item.get('volumeInfo')['imageLinks']
    book['language'] = item.get('volumeInfo')['language']
    book['deliveryOption'] = deliveryOpts[random.randint(0,2)]
    book['price'] = random.randint(5, 50)
    book.get('categories').append(subject)
    with open('./data/' + book['id']+'.json', 'w') as f:
        json.dump(book, f)
    
    
    
    
    


    
 



