import { View, Text, TextInput } from 'react-native'
import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react'
import { Button, ButtonText } from '@/components/ui/button'
import { useMutation, useQuery } from "convex/react";
import { api } from '@/convex/_generated/api';
import { ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '@/components/ui/icon';
import { Camera } from 'lucide-react-native';

export default function Add() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [seller, setSeller] = useState('')
  const [uploaded, setUploaded] = useState(false)
  const [uploading, setUploading] = useState(false)

  const userData = useQuery(api.userFunctions.currentUser);
  const addNewProduct = useMutation(api.userFunctions.createProduct);
  const generateUploadUrl = useMutation(api.userFunctions.generateUploadUrl);


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      // setImage(result.assets[0].uri);
      console.log(result.assets[0]);
      setUploading(true)
      const file = result.assets[0]
      
      if (file) {
        // Upload Image
        const postUrl = await generateUploadUrl()
        console.log(postUrl);
        
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": blob.type },
          body: blob,
        });
        const { storageId } = await result.json();
        console.log(storageId);
        
        setImage(storageId)
      }
      setUploading(false)
      setUploaded(true)
    } else {
      alert('You did not select any image.');
    }
  }

  useEffect(() => {
    if (userData?.email) {
      setSeller(userData.email)
    }
  }, [userData?.email])

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
    const file = e?.target?.files ? e.target.files[0] : ''
    
    if (file) {
      // Upload Image
      const postUrl = await generateUploadUrl()
      console.log(postUrl);
      
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file!.type },
        body: file,
      });
      const { storageId } = await result.json();
      console.log(storageId);
      
      setImage(storageId)
    }
    setUploading(false)
    setUploaded(true)
  }

  const addProduct = async () => {
    if (!name || !description || !image || !price || !seller) {
      console.log(name, description, image, price, seller)
      alert('Please fill all fields')
    }else{
      await addNewProduct({
        name: name,
        description: description,
        image: image,
        price: Number(price),
        seller: seller
      }).then((data) => {
        console.log(data);
        alert('Product Added')
        router.push('/view-products')
      }).catch((error) => {
        console.log(error);
        alert('Error adding product. Try again')
      })
    }
    
  }

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-2xl mb-5">Add Product</Text>
      <View className="w-full mb-2.5">
        <Text>Name</Text>
        <TextInput placeholder="Enter product name" className="border p-2.5 rounded" value={name} onChangeText={(text)=> setName(text)} />
      </View>
      <View className="w-full mb-2.5">
        <Text>Description</Text>
        <TextInput placeholder="Enter product description" className="border p-2.5 rounded" value={description} onChangeText={(text)=> setDescription(text)} />
      </View>
      {/* <View className="w-full mb-2.5">
        <Text>Image Upload</Text>
        <input type='file' onChange={uploadImage} />
        {uploading && <ActivityIndicator  />}
      </View> */}

      <View style={{
        alignItems: 'center',
        margin: 0
      }}>
        <Button onPress={pickImageAsync} className='text-white' ><Icon className='text-white' size='xl' as={Camera}/><ButtonText>Choose a photo</ButtonText></Button>
        {uploading && <ActivityIndicator  />}
      </View>
      
      <View className="w-full mb-2.5">
        <Text>Price($)</Text>
        <TextInput placeholder="Enter price(E.g 100)" keyboardType="numeric" className="border p-2.5 rounded" value={price} onChangeText={(text)=> setPrice(text)} />
      </View>
      {/* <View className="w-full mb-2.5">
        <Text>Quantity</Text>
        <TextInput placeholder="Enter quantity(E.g 100)" keyboardType="decimal-pad" className="border p-2.5 rounded" />
      </View> */}
      <Button onPress={addProduct} className='text-white font-bold' disabled={!uploaded}>Add Product</Button>
    </View>
  )
}