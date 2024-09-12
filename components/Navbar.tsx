'use client';

import { Cart, Logo, SearchIcon } from '@/components/icons';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { Input } from '@nextui-org/input';
import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from '@nextui-org/navbar';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

export default function Navbar() {
  const { formattedTotalPrice, cartCount } = useShoppingCart();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the dynamic cart values are only rendered after the component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const searchInput = (
    <Input
      aria-label='Search'
      classNames={{
        inputWrapper: 'bg-default-100',
        input: 'text-sm',
      }}
      endContent={
        <Kbd className='hidden lg:inline-block' keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement='outside'
      placeholder='Search...'
      startContent={
        <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
      }
      type='search'
    />
  );

  return (
    <NextUINavbar maxWidth='xl' position='sticky'>
      {/* Left side - Logo */}
      <NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
        <NavbarBrand as='li' className='gap-3 max-w-fit'>
          <NextLink className='flex justify-start items-center gap-1' href='/'>
            <Logo />
            <p className='font-bold text-inherit'>Fly Shop</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Right side - Cart, Theme Switch, and Search */}
      <NavbarContent
        className='hidden sm:flex basis-1/5 sm:basis-full'
        justify='end'
      >
        <NextLink href='/cart'>
          <NavbarItem className='hidden md:flex items-center gap-1'>
            <Cart className='text-base' />
            <p className='text-lg'>
              {isMounted ? formattedTotalPrice || '$0.00' : '$0.00'}
            </p>
            <span className='text-sm text-gray-500'>
              {isMounted ? `(${cartCount || 0})` : '(0)'}
            </span>
          </NavbarItem>
        </NextLink>
        <NavbarItem className='hidden sm:flex gap-2'>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>
      </NavbarContent>

      {/* Mobile View - Cart, Theme Switch */}
      <NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
        <NextLink href='/cart'>
          <div className='flex items-center gap-1'>
            <Cart className='text-base' />
            <p className='text-lg'>
              {isMounted ? formattedTotalPrice || '$0.00' : '$0.00'}
              <span className='text-sm text-gray-500'>
                {isMounted ? `(${cartCount || 0})` : '(0)'}
              </span>
            </p>
          </div>
        </NextLink>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Navbar Menu (for smaller screens) */}
      <NavbarMenu>
        {searchInput}
        <div className='mx-4 mt-2 flex flex-col gap-2'>
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href='#'
                size='lg'
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
