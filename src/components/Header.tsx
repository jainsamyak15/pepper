'use client';

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FaGoogle, FaEthereum, FaUserCircle, FaCopy } from 'react-icons/fa'
import { BiMenu, BiX } from 'react-icons/bi'
import { ethers } from 'ethers'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)

  const navItems = [
    { name: 'Teams', href: '/teams' },
    { name: 'Profile', href: '/profile' },
  ]

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log("Make sure you have MetaMask installed!")
        return
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error) {
      console.error("Error checking if wallet is connected:", error)
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert("Please install MetaMask!")
        return
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      setWalletAddress(accounts[0])
      setShowLoginModal(false)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(walletAddress)
    alert("Address copied to clipboard!")
  }

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="fixed w-full z-50 flex justify-center items-center py-4 px-6">
      <motion.div 
        className="bg-gray-800/95 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-between px-8 py-3 w-full max-w-6xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <Link href="/" className="text-2xl font-bold font-['Orbitron']">
          <motion.div
            className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Pepper
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className="text-lg font-semibold text-white relative overflow-hidden group"
                whileHover="hover"
                variants={{
                  hover: {
                    scale: 1.05,
                    transition: {
                      duration: 0.3
                    }
                  }
                }}
              >
                {item.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500"
                  variants={{
                    hover: {
                      scaleX: 1,
                      transition: {
                        duration: 0.3
                      }
                    }
                  }}
                  initial={{ scaleX: 0 }}
                />
              </motion.div>
            </Link>
          ))}
          {walletAddress ? (
            <div className="relative">
              <motion.button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-full transition duration-300 flex items-center"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <FaUserCircle className="mr-2" />
                {truncateAddress(walletAddress)}
              </motion.button>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md overflow-hidden shadow-xl z-10"
                >
                  <button onClick={copyAddressToClipboard} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                    <FaCopy className="inline mr-2" /> Copy Address
                  </button>
                  <Link href="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                    Admin Dashboard
                  </Link>
                  <Link href="/team-manager" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left">
                    Team Manager
                  </Link>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.button
              onClick={() => setShowLoginModal(true)}
              className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold py-2 px-6 rounded-full transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(236, 72, 153, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Connect Wallet
            </motion.button>
          )}
        </nav>
        
        <motion.button
          className="md:hidden text-2xl text-white"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.95 }}
        >
          {isOpen ? <BiX /> : <BiMenu />}
        </motion.button>
      </motion.div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-gray-800 backdrop-blur-lg bg-opacity-90"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-all duration-300"
                    whileHover={{ x: 5, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
              {walletAddress ? (
                <>
                  <motion.div
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-pink-500 to-cyan-500"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {truncateAddress(walletAddress)}
                  </motion.div>
                  <Link href="/admin/dashboard">
                    <motion.div
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ x: 5, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Admin Dashboard
                    </motion.div>
                  </Link>
                  <Link href="/team-manager">
                    <motion.div
                      className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-all duration-300"
                      whileHover={{ x: 5, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Team Manager
                    </motion.div>
                  </Link>
                </>
              ) : (
                <motion.button
                  onClick={() => {
                    setShowLoginModal(true)
                    setIsOpen(false)
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-pink-500 to-cyan-500 text-white transition-all duration-300"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Connect Wallet
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-700"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 font-['Orbitron']">Connect Wallet</h2>
              <div className="space-y-4">
                <motion.button
                  onClick={connectWallet}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-3 px-4 rounded-lg flex items-center justify-center font-bold transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 165, 0, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative flex items-center">
                    <FaEthereum className="mr-2 text-xl" /> 
                    Connect with MetaMask
                  </span>
                </motion.button>
              </div>
              <motion.button
                className="mt-6 text-gray-400 hover:text-white transition-colors duration-300 w-full text-center"
                onClick={() => setShowLoginModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header