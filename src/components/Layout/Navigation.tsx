import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  isActive?: boolean
  children: React.ReactNode
  path?: string
}

const Navigation = ({ isActive, children, path }: Props) => {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`${path}`)}
      className={`px-2 text-gray hover:text-lime-600 cursor-pointer ${
        isActive ? 'font-semibold text-lime-700' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default Navigation
