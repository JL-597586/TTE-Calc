import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import React, {Component} from 'react'

const Home = () => {

  interface FormData {
    fireRate?: 0,
    damage?: 0,
    healthPoints?: 0,
    damageReduction?: 0,
  }
  const [form, setForm] = useState<FormData | null>(null);

  const AmmoToElim = ((form?.healthPoints*(1+form?.damageReduction*0.01))/form?.damage)
  const AmmoToElimCeiling = Math.ceil( AmmoToElim )
  const TimeToElim = ((1/form?.fireRate)*AmmoToElimCeiling)

  return (
    <div>
      <Head>
        <title>Elim-Calc</title>
      </Head>

      <main>
        <h1 className=' flex min-w-screen justify-center text-6xl font-bold text-sky-400 m-2'>
          Elim-Calc
          <div className='flex w-5'></div>
          <div className='flex w-10 h-14 bg-sky-400 border rounded-md justify-center grid grid-col-1'>
           
            <div className='flex w-7 h-3 bg-sky-200 border rounded-sm m-1'></div>
            <div className='flex w-7 h-6 bg-sky-200 border rounded-sm m-1'></div>
            
          </div>
        </h1>

        <div className='flex min-w-screen justify-center h-10'></div>

        <div className='flex items-left w-96 flex-col mx-10'>
          <form>
            <p className='w-96 h-10 text-2xl mx-5 text-sky-300'>Fire-Rate</p>

            <input 
            className='w-96 h-10 border-sky-500 border rounded-md mb-5'
            name="fireRate" 
            onChange={(e) => setForm({...form, fireRate: e.target.value})}
            placeholder="0"
            type="number"
            data-testid="form-input-fireRate"
            />

            <p className='w-96 h-10 text-2xl mx-5 text-sky-300'>Damage</p>

            <input 
            className='w-96 h-10 border-sky-500 border rounded-md mb-5'
            name="damage" 
            onChange={(e) => setForm({...form, damage: e.target.value})}
            placeholder="0"
            type="number"
            data-testid="form-input-damage"
            />

            <p className='w-96 h-10 text-2xl mx-5 text-sky-300'>Health-Points</p>

            <input 
            className='w-96 h-10 border-sky-500 border rounded-md mb-5'
            name="healthPoints" 
            onChange={(e) => setForm({...form, healthPoints: e.target.value})}
            placeholder="0"
            type="number"
            data-testid="form-input-healthPoints"
            />

            <p className='w-96 h-10 text-2xl mx-5 text-sky-300'>Damage-Reduction (Percent)</p>

            <input 
            className='w-96 h-10 border-sky-500 border rounded-md mb-5'
            name="damageReduction" 
            onChange={(e) => setForm({...form, damageReduction: e.target.value})}
            placeholder="1"
            type="number"
            data-testid="form-input-damageReduction"
            />
            {/*}
            <button className='w-96 h-10 border-sky-500 border rounded-md mb-5 text-2xl text-sky-300'>Submit</button>
          */}
            </form>

          <div className='flex w-96 h-12 border-sky-500 border rounded-md mb-5 text-3xl text-sky-300'>
            <div className='ml-2'>Projectile-To-Elim:</div>
            <div className='ml-2'>{AmmoToElimCeiling.toFixed(0)}</div>
          </div>
          <div className='flex w-96 h-12 border-sky-500 border rounded-md mb-5 text-3xl text-sky-300'>
            <div className='ml-2'>Time-To-Elim (s):</div>
            <div className='ml-2'>{TimeToElim.toFixed(3)}</div>
          </div>
          
        </div>


      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Home
