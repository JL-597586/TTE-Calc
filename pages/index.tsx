import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import React, {Component} from 'react'

const Home = () => {

  interface FormData {
    name: string,
    fireRate: string,
    damage: string,
    healthPoints: string,
    damageReduction: string,
  }

  interface WpnData {
    n: string
    fr: number,
    d: number,
    hp: number,
    dr: number,
    ATE: number,
    TTE: number,
  }
  
  const [form, setForm] = useState<FormData>({name:'Sample-Item', fireRate: '4',
    damage: '25',
    healthPoints: '100',
    damageReduction: '0',});


  var AmmoToElim = 0
  var AmmoToElimCeiling = 0
  var TimeToElim = 0

  var hpFloat = parseFloat(form.healthPoints)
  var drFloat = parseFloat(form.damageReduction)
  var dFloat = parseFloat(form.damage)
  var frFloat = parseFloat(form.fireRate)

  const [posts, savePosts] = useState<WpnData[]>([{n: 'Sample-Item', fr:4, d:25,  hp:100,  dr:0, ATE:4,  TTE:1}])

  function SaveForm() {
  savePosts(posts => [...posts, {n:form.name, fr:frFloat, d:dFloat,  hp:hpFloat,  dr:drFloat, ATE:AmmoToElim,  TTE:TimeToElim,}]);
  }

  AmmoToElim = ((hpFloat*(1+drFloat*0.01))/dFloat)
  AmmoToElimCeiling = Math.ceil( AmmoToElim )
  TimeToElim = ((1/frFloat)*AmmoToElimCeiling)

  //AmmoToElim = ((form.healthPoints*(1+form.damageReduction*0.01))/form.damage)
  //AmmoToElimCeiling = Math.ceil( AmmoToElim )
  //TimeToElim = ((1/form?.fireRate)*AmmoToElimCeiling)

  function ScrollToTop() {
    // Scroll to top logic
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div>
      <Head>
        <title>Elim-Calc</title>
      </Head>

      <main>
        
        <h1 className=' flex min-w-screen justify-center items-center text-5xl font-bold text-sky-400 m-2'>
          
          Elim-Calc
          <div className='flex w-4'></div>
          <div className='flex w-10 h-14 bg-sky-400 border rounded-md justify-center grid grid-col-1'>
           
            <div className='flex w-7 h-3 bg-sky-200 border rounded-sm m-1 justify-left items-center'>
            
            </div>
            <div className='flex w-7 h-6 bg-sky-200 border rounded-sm m-1'>
            </div>
            
            
          </div>
          
          
        </h1>

        <div className='flex min-w-screen justify-center h-10'></div>


        <div className='fixed min-w-screen'>
            <div className='mt-96'></div>
            <button onClick={ScrollToTop} className='bg-sky-900 h-10 w-8 text-2xl text-center text-sky-300 rounded-md active:text-sky-200 active:bg-sky-500'>↑</button>
        </div>

        <div className='flex min-w-screen items-center justify-center flex-col'>
            

          <form>
            <p className='w-80 h-10 text-2xl mx-1 text-sky-300'>Item-Name</p>

            <input 
            className='w-80 h-10 border-sky-500 border rounded-md mb-5'
            name="name" 
            onChange={(e) => setForm({...form, name: e.target.value})}
            placeholder="Sample-Item"
            type="string"
            data-testid="form-input-name"
            />

            <p className='w-80 h-10 text-2xl ml-1 text-sky-300'>Fire-Rate</p>

            <input 
            className='w-80 h-10 border-sky-500 border rounded-md mb-5'
            name="fireRate" 
            onChange={(e) => setForm({...form, fireRate: e.target.value})}
            placeholder="4"
            type="string"
            data-testid="form-input-fireRate"
            />

            <p className='w-80 h-10 text-2xl ml-1 text-sky-300'>Damage</p>

            <input 
            className='w-80 h-10 border-sky-500 border rounded-md mb-5'
            name="damage" 
            onChange={(e) => setForm({...form, damage: e.target.value})}
            placeholder="25"
            type="string"
            data-testid="form-input-damage"
            />

            <p className='w-80 h-10 text-2xl ml-1 text-sky-300'>Health-Points</p>

            <input 
            className='w-80 h-10 border-sky-500 border rounded-md mb-5'
            name="healthPoints" 
            onChange={(e) => setForm({...form, healthPoints: e.target.value})}
            placeholder="100"
            type="string"
            data-testid="form-input-healthPoints"
            />

            <p className='w-80 h-10 text-2xl ml-1 text-sky-300'>Damage-Reduction (Percent)</p>

            <input 
            className='w-80 h-10 border-sky-500 border rounded-md mb-5'
            name="damageReduction" 
            onChange={(e) => setForm({...form, damageReduction: e.target.value})}
            placeholder="0"
            type="string"
            data-testid="form-input-damageReduction"
            />
            {/*}
            <button className='w-96 h-10 border-sky-500 border rounded-md mb-5 text-2xl text-sky-300'>Submit</button>
          */}

              <div className='flex w-80 h-12 border-sky-500 border rounded-md mb-5 text-2xl text-sky-300 items-center'>
                <div className='ml-2'>Projectile-To-Elim:</div>
                <div className='ml-2 text-sky-100'>{AmmoToElimCeiling}</div>
              </div>
              <div className='flex w-80 h-12 border-sky-500 border rounded-md mb-5 text-2xl text-sky-300 items-center'>
                <div className='ml-2'>Time-To-Elim (s):</div>
                <div className='ml-2 text-sky-100'>{TimeToElim.toFixed(3)}</div>
              </div>
              <div className='flex justify-center w-80 h-12 border-sky-500 border rounded-md mb-5 text-3xl text-sky-300 active:bg-sky-500 active:text-sky-100'>
                <button type="button" onClick={SaveForm} className='mx-2'>Save Item</button>
                
              </div>

              <div className='flex flex-col'>
              {
               posts.map(({n,fr,d,hp,dr,ATE,TTE}) => (
                <li className='flex grid grid-cols-2 text-sky-700 bg-sky-100 w-80 border rounded-md mt-2 mb-2' key={TTE}>
                  <div>Name: {n}</div>
                  <div></div>
                  <div>Fire-Rate: {fr}</div>
                  <div className='ml-2'>Damage: {d}</div>
                  <div className=''>Health-Points: {hp}</div>
                  <div className='ml-2'>Dmg-Reduction: {dr}</div>
                  <div className=''>Projectile-To-Elim: {ATE}</div>
                  <div className='invisible h-2'></div>
                  <div>Time-To-Elim: {TTE.toFixed(3)}s</div>
                  <div className='invisible h-2'></div>
                </li>
               ))
              }
            </div>

            </form>

            

  
          

          
        </div>


      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Home
