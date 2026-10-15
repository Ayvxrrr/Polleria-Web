import { MenuItem } from '../types/index.ts';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1WtLiUv386cbOYMovLxtq0erXQtjSbdUSvnvrywliRFUzIotTP40v7pc7vX9jSdlqzifxxTj9Wb26MVNPECw9fbyS0Copidxnfk9rqIZR0glc57Bl629l61IvkVFhl1wGQZS8JxCdDVEgfSSLjMU9AEsE37CzWJOlnSzGxxEe2czIkHG-fn2gBIrQlUrWBum1mPpKqqJoTjYzyiY_g6SlH4xMqqoUjdm8RQptKNP7mOrWWR7XIrj2aiuQs-0C_L_SwSsq2UiEdhHA';

export const FLYER_CLASICA_IRRESISTIBLE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAWO5xs4k7YJYqnf7KM5_lgciEcqWhX5Wywzm8bxKBmi6XJHCasfmSxEPFqSPkF2DabyxiB5ap01cT5-3b0sljA2uSrCxBw0fQEZnYr1MS4pRxu5NN2Lchfx3q_pQeIiAK4qAmlkNm3w6az8-0W4atPvutk6emRW6S_aPHtuYFGfSLisNu8Rn-dIsmoYZUgK5Z5EB-IGBKdJ3Mv5vDK93wtsboN_7a0qSq9mIoSOzQkKAzkgcYoSHG6SBG6xGa-NAWiPQ';

export const MAP_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTi2dY2m_kGDU5cfEunO9gjN47hoOqAmDSMjH-bjX9YqodRz3RUGI1gRdVkJ5d3n_9UD6pd526778jLF8LTsU20nr9_4Zx83_jseVLlsEP2tmzbqbaivdGbO-GaUy_DDyy_GDz-aP9aAkPUAgOxrbELAvvHyWIshHrqD3G_wt_-2KBRLT4_1h0M2bZ8e_cFlkDJTheYS12qXBv3K9tPb6tatmDQexGWcdcH8E4j5Um4gFfb2mRkiRA';

export const MENU_ITEMS: MenuItem[] = [
  // --- COMBOS & PARRILLAS ---
  {
    id: 'oferta-clasica-irresistible',
    title: 'Oferta Clásica Irresistible',
    description: '1 Pollo entero dorado a la brasa + Chaufa de pollo al wok + Papas fritas crujientes + Ensalada fresca + Gaseosa Pepsi 2L + Cremas de la casa.',
    price: 72.00,
    originalPrice: 77.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Estrella • Más Pedida',
    badgeType: 'primary',
    image: FLYER_CLASICA_IRRESISTIBLE,
    serves: '4 - 5 personas',
    tags: ['1 Pollo Entero', 'Chaufa Especial', 'Papas Fritas', 'Pepsi 2L', 'Cremas'],
    taperCount: 2,
    isPopular: true,
    isOffer: true
  },
  {
    id: 'parrilla-tonito',
    title: 'Parrilla Toñito',
    description: '1/4 de Pollo a la brasa + 1 Chuleta de cerdo tierna + 2 Brochetas de pollo + 2 Anticuchos de corazón + 2 Chorizos parrilleros + Papas fritas + Ensalada + Jarra de Bebida Natural 1L.',
    price: 70.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Recomendado del Maestro',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVBs9u3kgAi4UqU3YnzRS9haa7cGkqh6oEajXqHCczmCNMTE0l0QUzh8X9hdaOBNeT4BmzG2jFty3RbYS-gS2KceaqYo_v_cd2eHQ1bNa15bqCiKxmCVCprAVc8gTBPcdvA_rPmmDNBpJec_TAafj0hT6B9sHeGxMvF0bJL5NRRPaRPx28Y126WBrnYHQ_WosDYUjn6T9yECvyoTdPdKjFiNvcx8pivuct7b-oo9ZdEl3ckwV8EPFl',
    serves: '2 - 3 personas',
    tags: ['1/4 Pollo', 'Chuleta', 'Brochetas', 'Anticuchos', 'Chorizos', 'Bebida 1L'],
    taperCount: 2,
    isPopular: true
  },
  {
    id: 'parrilla-familiar-gigante',
    title: 'Parrilla Familiar Gigante',
    description: '1 Lomo fino a la parrilla + 1/4 Pollo + 1 Churrasco + 1 Chuleta + Mollejitas crocantes + 3 Anticuchos + 4 Chorizos + Papas fritas + Ensalada + Bebida natural o Gaseosa.',
    price: 110.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Mega Banquete',
    badgeType: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaNXAKWOV53HtDw0p0u-0fjWqHDDm0gbVrdpMCW0VsuTS_whckZ7x8dU1nlIW5C1z_QCzhZg892bk7Ji2CQl5uryNUhVCOtXyZP6yV2ovGhtEiYtiL4rjAReV9Ya7bJPqzWCJNWH-UY42ABXFHHc3NChl-PDVcmbLI-Mcr0lXpwTNzn5P1dznK2u1eYoMR1rY-drxwxEnZFMh9N41C7I8nlPYDnsb2TXU10TYDJNx3cNXeRScBZGlO',
    serves: '4 - 5 personas',
    tags: ['Lomo', '1/4 Pollo', 'Churrasco', 'Chuleta', 'Mollejas', '4 Chorizos', 'Bebida'],
    taperCount: 3,
    isPopular: true
  },
  {
    id: 'oferta-mega-familiar',
    title: 'Oferta Mega Familiar',
    description: '1 Pollo entero + 1/4 de pollo adicional + fuente generosa de Chaufa Especial al wok + papas fritas doradas + ensalada grande + Jarra de Bebida Natural 2 Litros (chicha o maracuyá).',
    price: 92.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Gran Evento',
    badgeType: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi-1SluQkEr4Wonhyll7_3i3F-mjLJ5DZCJI5rLiqHKWzQyvZRJFx8K6YZK3bA-FB5O7Z_4jMJ5ZffT1VPhU0cMlQfjzj6xXd7OeiYLGIbCW-kJjZkz8yhfPdKflZqZbIEnK20T6AmUdmcniw4jzCOIJemLRaP-5h_OG7pv2GpeTlPDPpbMdDNAM_Y_hca85_P4ZHkYUDoLuCAOnZcK37aPFXtUBYanQD4PXivGgad_3WTV_dwVlGe',
    serves: '6 personas',
    tags: ['1¼ Pollo', 'Chaufa Especial', 'Papas Grandes', 'Bebida Natural 2L'],
    taperCount: 2,
    isOffer: true
  },
  {
    id: 'combo-familiar-1',
    title: 'Combo Familiar 1 (1 + 1/4)',
    description: '1 Pollo entero a la brasa + 1/4 pollo solo + porción abundante de papas fritas + ensalada fresca + Gaseosa Pepsi de 2 Litros.',
    price: 66.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Ahorro Familiar',
    badgeType: 'tertiary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxQFtr-cnJwNt-IP2xHcDkVDQS7U3QQB8-U1kkrVMcUFQmgs6b7KhggKGXFntMoQ7UEv9mTN2UPfJmZM45re175NjRTyLvm6-G4i4WYVl-lCIstnig-1bMjWY0OLufk4TxkhO757dFN_vClaC04KGPwrPKC-x-N075evEhJPU-YAEAmU2vRG2S8lh26d8BvPY14Y0DT2UQ8VVe7u-UHXCTlFD_Q2wDgxVc3DOOEw3g4k7Lq43SrB10',
    serves: '4 - 5 personas',
    tags: ['1¼ Pollo', 'Papas Familiares', 'Pepsi 2L'],
    taperCount: 2,
    isOffer: true
  },
  {
    id: 'combo-familiar-2',
    title: 'Combo Familiar 2 (1 + 1/4 + 1.5L)',
    description: '1 Pollo entero + 1/4 de pollo solo + porción familiar de papas crocantes + ensalada clásica + Gaseosa 1.5 Litros (Inca Kola o Coca Cola).',
    price: 70.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Clásico Toñito',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKcmaEsETTkBWReXcbBSp6IQq1GQU-CB8rz9cTFqWuIn1-uCnW9Gne97vivg89K0XpVzkkjM5EJlfxNR1pGK5dX4QpeYm6BHb1irM3DWJGfqGgaqOKjky1_pjVgm8RtVi0SJVX_RkzKE0dOIUP7AoQ0-dLKt6vWe4JtJkM4COlJO3BgiPT99vTzdChF7-KxTZk8bYLW6QNNEIhQdxeg0gSE4BtUikGO7xvZ1Jbi_SdjknXmkgTBA9f',
    serves: '4 - 5 personas',
    tags: ['1¼ Pollo', 'Papas Crocantes', 'Gaseosa 1.5L'],
    taperCount: 2
  },
  {
    id: 'combo-familiar-3',
    title: 'Combo Familiar 3 (1 + 1/2 Pollo)',
    description: '1 Pollo entero + 1/2 pollo solo + papas fritas doradas + ensalada fresca + Gaseosa 1.5 Litros bien helada.',
    price: 78.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Ultra Rendidor',
    badgeType: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWgUa2dF3-tL8uE1pW9l8855Fm7vX1s2h4k-vB3l7oW1a2b3c4d5e6f7g8h9i0j',
    serves: '5 - 6 personas',
    tags: ['1½ Pollo', 'Papas XXL', 'Gaseosa 1.5L'],
    taperCount: 2
  },
  {
    id: 'combo-lomo-parrillero',
    title: 'Combo Lomo Parrillero',
    description: 'Lomo tierno a las brasas + Mollejita crocante + Brocheta de pollo + Papas fritas + Ensalada clásica.',
    price: 36.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Corte Fino',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAIWAECkn_mttLHPm1ofEkHbWYpXEJBh4BFvlUKUk4JtvvCgFBj_y3EKQrnYvYn1tkoGiUXfDwiEm05fbQKXQOB6MHDJ3l28HYUHlp5EaJ0wWvXq-PFROm2pKMJ49N3ScK18-ae04QQn5xCcS0XGQZhRJB-wzY5FgV-Och4CRFfmy6xbG31tB5p5re7OIMkquLQYI1HD6F-tc-tkPWFm7S54gf2sbinRYUTuPOW9aFyUlDQEEra-gy',
    tags: ['Lomo', 'Mollejita', 'Brocheta', 'Papas'],
    taperCount: 1
  },
  {
    id: 'combo-chuleta',
    title: 'Combo Chuleta',
    description: 'Chuleta marinada a la brasa + Anticucho de corazón + Brocheta jugosa + Papas fritas + Ensalada.',
    price: 28.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Parrillero',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHnPag0MxK-Nj_krywoquzKvVSPtuB4fqv8PyqC2yiOMiqQCHoOeQ2P7ztDmcy-TBq7dq7dPZXlM7QlBiAL9biHr16JoIpWAy3AJ3tLtkw7NBwyjidNUHoTqWTvrfXVujsRpu5F_SF0lpg-hU7c-PCk5vAEn7VMvTt43rNRkxoFAC86d1ldxPw8emcrPSnIj8Z2Wjo8rScFIL8I82R0-1lAN2p3oD_S61utGDjHHdzXYp35Or19whD',
    tags: ['Chuleta', 'Anticucho', 'Brocheta', 'Papas'],
    taperCount: 1
  },
  {
    id: 'combo-filete',
    title: 'Combo Filete',
    description: 'Filete de Pollo dorado a la plancha + Anticucho + Chorizo parrillero + Papas fritas crocantes + Ensalada.',
    price: 28.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG-fpICU9-J2hELAANljHpNjTPdPgJHcncSPMIdYydB7Mhkjgsiy1PdLvlRr4AAkCqEzX5EMPTKrYVff6OZY4ERosoJ13Yrb3-earyeZc5U0IfuHP7laon6vQVakGYZsUHTHioM3ufgWmshzg62EikGfG7JsHJLhda3ZKMnqCz8tvKLuM1FrSZy7ydrNfOjloTOuRPT-uF3fG_WtuGWxeUtssbJUVavsCsoJNE25vHlqMVH-G_I0i8',
    tags: ['Filete', 'Anticucho', 'Chorizo', 'Papas'],
    taperCount: 1
  },
  {
    id: 'combo-churrasco',
    title: 'Combo Churrasco',
    description: 'Churrasco jugoso a las brasas + Anticucho + Brocheta + Papas fritas + Ensalada fresca.',
    price: 28.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSNjmUgHk7IkRS9_rF_9mJJk2cpWXCuQsFKH895Q2MzhJF3J0kQBuCQ-zLDqPCRemmlTw9CuC-RkcootZa3hO9hdTyht4BRR3C7q8tO3c5Nyac2uIfMoM_gJE6-h7DKTgnzqtcMHKfAp9wAW0Uwz43ljF6V-oIdy3vsI5bDRFqbrNPtFin69OrYHMw9Y_sRtgFwWvx7j6-G1VlJGZllcQ5e_wPBJsx5-8KHEOIOzQg-bVq64BcmZeS',
    tags: ['Churrasco', 'Anticucho', 'Brocheta', 'Papas'],
    taperCount: 1
  },
  {
    id: 'combo-cuarto-pollo',
    title: 'Combo 1/4 de Pollo Parrillero',
    description: '1/4 de Pollo a la brasa + Anticucho de corazón + Chorizo + Papas fritas + Ensalada.',
    price: 27.00,
    category: 'combos',
    categoryLabel: 'Combos & Parrillas',
    badge: 'Favorito',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX_RH8S4cXq4RQBm0t9DNIdC0koYxLUlNYjs4wqNCVyLwQDpKCjUsk_thD2MhLxf05VsLmaFnOQAOe_95fAjt-bWrkki7erX40gi78T6Ny8K6eUSRK-cobFfkgf-qk_EVtoX4RFfeErjpa_OegrIsSimtJZe7W1CQxw7r8v0NNDUG3LXRGpkYKv_Fouw2uTLw8y4al8CeyuyCRv4-bCpYvKz03cQQTD4y72lT1tyejk56S96XwoNwW',
    tags: ['1/4 Pollo', 'Anticucho', 'Chorizo', 'Papas'],
    taperCount: 1
  },

  // --- POLLOS A LA BRASA ---
  {
    id: 'pollo-oferta-pepsi',
    title: '1 Pollo Entero ¡Oferta! + Pepsi 2L',
    description: '1 Pollo entero a la brasa con el doradito tradicional + papas fritas crocantes + ensalada fresca + Gaseosa Pepsi 2 Litros.',
    price: 62.00,
    originalPrice: 68.00,
    category: 'pollos',
    categoryLabel: 'Pollos a la Brasa',
    badge: '¡Súper Oferta!',
    badgeType: 'primary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw0B2Tf0nDK7uLwiw9dUHGtAQIUv73UnVlRAAio-QLWICdJy6rbkXn36VS54RLAYmTziMptCSRRg8PoX7rUo301MO1JQefet6khu9uHfPxZeudFC2fYr1rCbT1Cqfjwrgm3BUX_QER7t6smFDda0mayeqiopvJihSzX1OdcRmJ9W4mkRwbOeUETmcbrIARH4NYKNYRXHfpViCmJEww3HCJXzfkumwef5xmTvOQXM0KgRrlQHlfuuWQ',
    serves: '4 personas',
    tags: ['1 Pollo Entero', 'Papas Fritas', 'Pepsi 2L'],
    taperCount: 2,
    isPopular: true,
    isOffer: true
  },
  {
    id: 'pollo-entero-solo',
    title: '1 Pollo Entero a la Brasa',
    description: 'Pollo entero a la brasa + gran porción de papas fritas doradas + ensalada fresca + todas las cremas de la casa.',
    price: 58.00,
    category: 'pollos',
    categoryLabel: 'Pollos a la Brasa',
    badge: 'Clásico Limeño',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8LiOk8YCEDXURTNGCbXF48hcuIPfCPcFkxsMkXV-SXUzAXZun1czbxNo0z7DMIUFrTnKH5KubY7pRklVvXA_sRnJ5ynNcD364-ZGFlJvBVcdXOaD8-NYlRipLfYSyJWxeC1LQtZlX8XpytsJNUToAQb4kuvfpY_xyidT7KJhRRCw0yIgc0bRkHEvexXOKc_zlBUMZ8yKlPCIdJ0ioF_elNMvJZtk5-JLMN93Q3t9mbdJ_09-t-MFQ',
    serves: '4 personas',
    tags: ['Pollo Entero', 'Papas Fritas', 'Ensalada'],
    taperCount: 2
  },
  {
    id: 'medio-pollo',
    title: '1/2 Pollo a la Brasa',
    description: 'Medio pollo dorado y jugoso + generosa porción de papas fritas + ensalada fresca con vinagreta artesanal.',
    price: 33.00,
    category: 'pollos',
    categoryLabel: 'Pollos a la Brasa',
    badge: 'Dúo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBVkC9O-JW119iGLH2dAYqXz-6ThFxl4FcEdp38RPYty2lPVMQRpKUUM5EIoUZx0gwFvTrotA_J9i28hwQKmfqj-GqlJ96958Byysoc6OV1TxmXpZOWgjfNSt6-SNrx2aUziUdRvJn8qDdhgiL1jGcNk-vpxQKrY5Ssb5qA0I_vC5JgD_jE4kDSRgRBErrQ425KAMXciN3lnD3jQDYLCZcyef4tNYNXAcbY6unOP7F0qb_5XO31eTdK',
    serves: '2 personas',
    tags: ['Medio Pollo', 'Papas', 'Ensalada'],
    taperCount: 1
  },
  {
    id: 'cuarto-pollo',
    title: '1/4 de Pollo a la Brasa',
    description: 'Pierna o pecho a la brasa con piel crocante + papas fritas doradas + ensalada personal + ají pollero.',
    price: 18.00,
    category: 'pollos',
    categoryLabel: 'Pollos a la Brasa',
    badge: 'Individual',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF825BNIDmOtktaoH69e-JQBUc6V-LHD2GnOK0QQbjhLjsUHqHHx1xp_h9rP5ttvAVA2xCyE2yHRWxOd4n4Ymz73xTaBu6Uy9a8HoJs509Xc6EnIbRci5I_WHqYtbhAOh0y7akchckkBU0G5iaiZubS5xQgxhTQUK_LwPk4JLs3lypylg45WnAZ3C6prp-MTzA6HHh9-tf6x4jWcv_4UHF0RXtM0CquKUpZLjBYa3KR9oUxb5wqpjh',
    serves: '1 persona',
    tags: ['Cuarto de Pollo', 'Papas', 'Ensalada'],
    taperCount: 1
  },

  // --- MOSTRITOS & WOK SALTEADOS ---
  {
    id: 'mostro',
    title: 'El Gran Mostro',
    description: '1/4 de pollo a la brasa dorado + abundante arroz chaufa de pollo salteado al wok al fuego vivo + papas fritas + ensalada.',
    price: 20.00,
    category: 'mostritos',
    categoryLabel: 'Mostritos & Salteados',
    badge: 'Popular',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp1qtmFFCYuBNioOwQEb9R87esa-KqoXcxzHKOd5Of4Qd8x9p1YAmRz41c8dfEh3gHUO69-wu2X2PHvgQ0h-IBvZvPExzue0WGR7wgOh7xaRkZeqEjr6ZYMYd5UOeCxBqaCIHtk-Vm1rdAGqhMLRuqc35R96YkLFQUe9OI-1P_HHEhBfFL1JdOH2PauNkP17Q7zn9uRz3YOiqyFMqr5rt8cRiBZInz0LLh30FzMYLXZqftq1mrdd82',
    serves: '1 persona bien servida',
    tags: ['1/4 Pollo', 'Chaufa al Wok', 'Papas Fritas', 'Ensalada'],
    taperCount: 1,
    isPopular: true
  },
  {
    id: 'mostrito',
    title: 'Mostrito Toñito',
    description: '1/8 de pollo a la brasa + arroz chaufa salteado al wok + papas fritas doradas + ensalada fresca + ají de la casa.',
    price: 14.00,
    category: 'mostritos',
    categoryLabel: 'Mostritos & Salteados',
    badge: 'Clásico Al Paso',
    badgeType: 'tertiary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDvKyzScyXbjdQ1OZbOFrU_uK4qUm6opYYcxIeq0V5iLwOLyDI8fM5Zd4k1Iv2f7BlIgt_60JYmGHoGZ8Fu8lBDyV7CQ2dnVyPQM2ocAjdyHI6TT8rJcoKnAVQv9Uk2ew-AMYE0Ims6t-ApcIMy9C66z2klFGlehfptawMBKaKVrp_MiBxHPV-uvICaMXYOsL_J5jSXWU5h05gzS3MyUDUKEjfXZT9KQpo4RJSh31AgeSpAiJKhe9S',
    serves: '1 persona',
    tags: ['1/8 Pollo', 'Chaufa', 'Papas'],
    taperCount: 1,
    isPopular: true
  },
  {
    id: 'lomo-saltado-chaufa',
    title: 'Lomo Fino Saltado c/ Chaufa',
    description: 'Trozos de lomo fino salteados al wok con cebolla, tomate criollo jugoso y cilantro, papas nativas doradas y arroz chaufa.',
    price: 23.00,
    category: 'mostritos',
    categoryLabel: 'Mostritos & Salteados',
    badge: 'Criollo Fuego',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxrhmGaSrwSg_NJ5LeWWYF-P8Fvxe46BTfu2RwD7_UDLW8IUnXu_qrrVRCaHooSMf439vVSOtN-o3xY3bcpd-RGwqYehtY3mQepa7pstaZhfd3SFNzxOHkhNASOPl8JS0nVik_O7xa-XkfxKkS9JnjLL56nz8lWYXl1v_MgUyO-r7I1SiXdzr0JmdzcNmG9eCf-Bh0X6FFq6NOFGl-UAMErIpaLSJMD3hWUnP-HK3xg8QK5V6s94p3',
    tags: ['Lomo Fino', 'Saltado', 'Chaufa', 'Papas Nativas'],
    taperCount: 1
  },
  {
    id: 'pollo-saltado-chaufa',
    title: 'Pollo Saltado c/ Chaufa',
    description: 'Trozos de pechuga de pollo salteada al fuego vivo con cebolla crujiente, tomate y papas fritas, acompañado de arroz chaufa.',
    price: 16.00,
    category: 'mostritos',
    categoryLabel: 'Mostritos & Salteados',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNMEZqeD5ZgmXHkcn1HsJS91PmaCf-ALJdUGWBrPD5RmQ7c6ak1wrTAYWriSDnqBFQpROTDcisdXV-EjEr7bKDh7GvNENsEa_LKTixC7N2FbMCegIFuIFzJ_KeUmfF8MjueVljp9JsMhK7OguAqueZnWZqSJh6j5wSCyrsE94YKTRqCwMJVS1gMMz-7t34tYsiB0frHH3CZRoBgvih3s5hLHEAOHy7coWke6CdV8ecflzw0krl5UQT',
    tags: ['Pollo Saltado', 'Chaufa', 'Papas'],
    taperCount: 1
  },

  // --- PIQUEOS & ESPECIALIDADES AL CARBÓN ---
  {
    id: 'anticucho-corazon',
    title: 'Anticucho de Corazón (3 palitos)',
    description: '3 palitos de anticucho tierno macerados en ají panca, ajo y especias secretas + papas sancochadas doradas a la parrilla + choclo y cremas.',
    price: 22.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    badge: 'Tradición Carretillera',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8IEkoJi0zPSU0KJr_t-8IYlAHOyiGQJi8wuL8lzQYqm1Oxl3AKeyayWBiWrY1G6lZF_Lk7dPcnQ6AJ1n6oxDcT0WYZI_NQF4YTyBJh2W5eJol3eXxkMNYXZH0pGWMrDk258NfF-1M0QN6OrnwjQh7DYWHezaBSl4Rj0sJ_p8R3XSmVgr1Q65DmkHhdxHrmFFSSSOKimibFxwGKygCkprX6dZnax2JjOVpZLA1IbcScxeIzyzMs1nk',
    tags: ['Anticuchos', 'Ají Panca', 'Papas Doradas'],
    taperCount: 1,
    isPopular: true
  },
  {
    id: 'brocheta-pollo',
    title: 'Brocheta de Pollo (3 palitos)',
    description: '3 palitos jugosos a la parrilla con pimientos y cebolla + papas fritas + ensalada.',
    price: 22.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG-fpICU9-J2hELAANljHpNjTPdPgJHcncSPMIdYydB7Mhkjgsiy1PdLvlRr4AAkCqEzX5EMPTKrYVff6OZY4ERosoJ13Yrb3-earyeZc5U0IfuHP7laon6vQVakGYZsUHTHioM3ufgWmshzg62EikGfG7JsHJLhda3ZKMnqCz8tvKLuM1FrSZy7ydrNfOjloTOuRPT-uF3fG_WtuGWxeUtssbJUVavsCsoJNE25vHlqMVH-G_I0i8',
    tags: ['Brochetas', 'Papas Fritas', 'Ensalada'],
    taperCount: 1
  },
  {
    id: 'costilla-cerdo-bbq',
    title: 'Costilla de Cerdo BBQ',
    description: 'Costilla de cerdo tierna glaseada con salsa BBQ artesanal de la casa + papas nativas doradas + ensalada fresca.',
    price: 32.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    badge: 'Ahumado',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKF4sta9hhvpsZfUjbczIeU924TS3mbB93CsYXS0fVRVmeDQxbFf5mfqAtIzWrXQLBEzLA7cT9lT65cA_hgjx3AFIDSzb-I4wq_7qJ4Iwb1vuuNkjLwwOMtnZuChPCTLHEilOmK78LA0XPoxKf_2NMGRVjlWg88BuTV8f9Dp3yYwfD3x1LKBsaBqHszSqxh_Ig1tDi-_8AeTOley1yn7z5tzXzSPXmxv_o0PB64XyWtZKVyNlVdZo1',
    tags: ['Costilla', 'BBQ', 'Papas Nativas'],
    taperCount: 1
  },
  {
    id: 'piqueo-tonito',
    title: 'Piqueo Toñito',
    description: 'Brochetas de pollo + anticucho de corazón + brocheta de panceta crocante + papas doradas al grill y salsas.',
    price: 28.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    badge: 'Piqueo Estrella',
    badgeType: 'secondary',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWX-v_wIKk3rQk3WYs39ICO8_vPMnzfUAJr1BVyXhUNqzJQmhC766oVl_n_tSqHW8ZJBsnGy_E7EYkZtFwxEPWp4vAjgX8wJ1_3ceQalhIqTLhhRyPb-JKJ2lp6vr7pFjP8oln3wDJiLdK7rzy5Z4WR7TNDkPFAwDzCoFxgejnc_8lIgtD6CXyBKz9XBDUFVYdTUwi9RtQiB6XfO7w_6o5dY_0_KWgHX7PvGKMcePuq3WIhejiWHJ9',
    tags: ['Brochetas', 'Anticuchos', 'Panceta', 'Papas'],
    taperCount: 1
  },
  {
    id: 'mollejitas-doradas',
    title: 'Mollejitas Doradas',
    description: 'Porción generosa de mollejitas crocantes por fuera y suaves por dentro marinadas con ajíes peruanos + papas fritas + ensalada.',
    price: 15.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD28AKLUbPeRfg_-UROW9tWT9tJhxwv0XCMC6dGeER4TRhpE7Zaz7CTfhXnRDyhJ3VRmH0L1fNDgFudxHC8GwSyuNYSW0Xj9KbERtlEZdCbvBY7qe83OpKI0fKf8IBQJiKbi_Wof_CNY2gLuQBgDjOlOrCCUA1JX6oxG7DjNQcwobvwG3dZuEX8zVMcvs2v-4DPoTXnQYF3_DbbILe7vZigOckh2qvfNyiqQ-2QrggcLOZ7m0_wByE',
    tags: ['Mollejas', 'Papas', 'Ensalada'],
    taperCount: 1
  },
  {
    id: 'lomo-fino-parrilla',
    title: 'Lomo Fino a la Parrilla',
    description: 'Tierno corte selecto de lomo fino a las brasas de carbón + papas fritas + ensalada fresca clásica.',
    price: 29.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAIWAECkn_mttLHPm1ofEkHbWYpXEJBh4BFvlUKUk4JtvvCgFBj_y3EKQrnYvYn1tkoGiUXfDwiEm05fbQKXQOB6MHDJ3l28HYUHlp5EaJ0wWvXq-PFROm2pKMJ49N3ScK18-ae04QQn5xCcS0XGQZhRJB-wzY5FgV-Och4CRFfmy6xbG31tB5p5re7OIMkquLQYI1HD6F-tc-tkPWFm7S54gf2sbinRYUTuPOW9aFyUlDQEEra-gy',
    tags: ['Lomo Fino', 'Papas', 'Ensalada'],
    taperCount: 1
  },
  {
    id: 'churrasco-brasa',
    title: 'Churrasco a la Brasa',
    description: 'Generoso corte de res churrasco a la parrilla en su punto + papas fritas crocantes + ensalada.',
    price: 20.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSNjmUgHk7IkRS9_rF_9mJJk2cpWXCuQsFKH895Q2MzhJF3J0kQBuCQ-zLDqPCRemmlTw9CuC-RkcootZa3hO9hdTyht4BRR3C7q8tO3c5Nyac2uIfMoM_gJE6-h7DKTgnzqtcMHKfAp9wAW0Uwz43ljF6V-oIdy3vsI5bDRFqbrNPtFin69OrYHMw9Y_sRtgFwWvx7j6-G1VlJGZllcQ5e_wPBJsx5-8KHEOIOzQg-bVq64BcmZeS',
    tags: ['Churrasco', 'Papas', 'Ensalada'],
    taperCount: 1
  },
  {
    id: 'tequenos-wantan',
    title: 'Porción de Tequeños o Wantán (6 unids)',
    description: 'Tequeños crocantes rellenos de abundante queso fundido con crema de palta artesanal o salsa de la casa.',
    price: 6.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    badge: 'Entrada Clásica',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Atuh7yu4cFTCKErzruSw4dRRcOtFgPADK2k_HepSRSdsi-JDTWKBluKhvzHP0AJ7zQ-G8EepiZH3Yc-t1-eC-DIBO0DSQwEhbI_GtsVK8-41eHnLrxMlg9NKpcJgC78GSqNsI8PR_fhuD6LGKMDze6yLU68bp3UfXjNlX1gcqK0TLjqNe_nxnYx-0hfWTJ4Qv965vf7ax0q0uv-43CFYqCSnRMl2yKBIh8yfOZDHet2fwnHYIeC3',
    tags: ['Tequeños', 'Queso', 'Guacamole'],
    taperCount: 1
  },
  {
    id: 'ensalada-parrillera',
    title: 'Ensalada Parrillera Completa',
    description: '1/2 Pechuga de pollo a la brasa en tiras + lechuga fresca + palta fuerte + choclo desgranado + verduras grilladas.',
    price: 16.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    badge: 'Frescura',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPAsfiSEAZob8GCe9OY3yQUH_pxoGEy_LPkc0NRGRrqqm7cgO-ErDYoNzTn_8sxoQ51fh9fWPoRtTG4EmR5mC6aTh4oqFkufIl_57JflISDy2t2sHiJF5PZPTAnMpY51EKo68Oy92p_aoa9oJBR0x7vgshPMiOQjaW8gPlVVOsOWxLE68UeasT2d4AhWFAQwVEwkaRriJt5dBUzYjJZBIMWok8JDUpJxZQN3e3y0WgsBQQulcdFdJ',
    tags: ['Pechuga', 'Palta', 'Choclo', 'Ensalada'],
    taperCount: 1
  },
  {
    id: 'porcion-papas',
    title: 'Porción de Papas Fritas',
    description: 'Papas fritas crocantes y doradas al punto exacto de sal. Ideal como guarnición adicional.',
    price: 14.00,
    category: 'piques',
    categoryLabel: 'Piqueos & Parrillas',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8LiOk8YCEDXURTNGCbXF48hcuIPfCPcFkxsMkXV-SXUzAXZun1czbxNo0z7DMIUFrTnKH5KubY7pRklVvXA_sRnJ5ynNcD364-ZGFlJvBVcdXOaD8-NYlRipLfYSyJWxeC1LQtZlX8XpytsJNUToAQb4kuvfpY_xyidT7KJhRRCw0yIgc0bRkHEvexXOKc_zlBUMZ8yKlPCIdJ0ioF_elNMvJZtk5-JLMN93Q3t9mbdJ_09-t-MFQ',
    tags: ['Papas', 'Guarnición'],
    taperCount: 1
  },

  // --- BEBIDAS & LICORES ---
  {
    id: 'jarra-chicha-maracuya',
    title: 'Jarra de Bebida Natural 1 Litro',
    description: 'Chicha morada tradicional preparada con maíz morado, piña y canela, Maracuyá refrescante o Limonada.',
    price: 12.00,
    category: 'bebidas',
    categoryLabel: 'Bebidas & Refrescos',
    badge: '100% Artesanal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKcmaEsETTkBWReXcbBSp6IQq1GQU-CB8rz9cTFqWuIn1-uCnW9Gne97vivg89K0XpVzkkjM5EJlfxNR1pGK5dX4QpeYm6BHb1irM3DWJGfqGgaqOKjky1_pjVgm8RtVi0SJVX_RkzKE0dOIUP7AoQ0-dLKt6vWe4JtJkM4COlJO3BgiPT99vTzdChF7-KxTZk8bYLW6QNNEIhQdxeg0gSE4BtUikGO7xvZ1Jbi_SdjknXmkgTBA9f',
    tags: ['Chicha Morada', 'Maracuyá', 'Limonada', 'Jarra 1L']
  },
  {
    id: 'frozen-jarra',
    title: 'Frozen en Jarra (Maracuyá / Limón)',
    description: 'Refrescante batido helado frozen a base de frutas frescas al momento.',
    price: 17.00,
    category: 'bebidas',
    categoryLabel: 'Bebidas & Refrescos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi-1SluQkEr4Wonhyll7_3i3F-mjLJ5DZCJI5rLiqHKWzQyvZRJFx8K6YZK3bA-FB5O7Z_4jMJ5ZffT1VPhU0cMlQfjzj6xXd7OeiYLGIbCW-kJjZkz8yhfPdKflZqZbIEnK20T6AmUdmcniw4jzCOIJemLRaP-5h_OG7pv2GpeTlPDPpbMdDNAM_Y_hca85_P4ZHkYUDoLuCAOnZcK37aPFXtUBYanQD4PXivGgad_3WTV_dwVlGe',
    tags: ['Frozen', 'Maracuyá', 'Limón', 'Mango']
  },
  {
    id: 'jarra-sangria',
    title: 'Jarra de Sangría de la Casa',
    description: 'Preparada con vino tinto de la casa, macerado con frutas de temporada y toque secreto.',
    price: 28.00,
    category: 'bebidas',
    categoryLabel: 'Bebidas & Refrescos',
    badge: 'Especial',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaNXAKWOV53HtDw0p0u-0fjWqHDDm0gbVrdpMCW0VsuTS_whckZ7x8dU1nlIW5C1z_QCzhZg892bk7Ji2CQl5uryNUhVCOtXyZP6yV2ovGhtEiYtiL4rjAReV9Ya7bJPqzWCJNWH-UY42ABXFHHc3NChl-PDVcmbLI-Mcr0lXpwTNzn5P1dznK2u1eYoMR1rY-drxwxEnZFMh9N41C7I8nlPYDnsb2TXU10TYDJNx3cNXeRScBZGlO',
    tags: ['Sangría', 'Vino Tinto', 'Frutas']
  },
  {
    id: 'gaseosa-1-5l',
    title: 'Gaseosa 1.5 Litros (Inca Kola / Coca Cola)',
    description: 'Botella familiar bien helada, el acompañamiento perfecto para tu pollo a la brasa.',
    price: 13.00,
    category: 'bebidas',
    categoryLabel: 'Bebidas & Refrescos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDw0B2Tf0nDK7uLwiw9dUHGtAQIUv73UnVlRAAio-QLWICdJy6rbkXn36VS54RLAYmTziMptCSRRg8PoX7rUo301MO1JQefet6khu9uHfPxZeudFC2fYr1rCbT1Cqfjwrgm3BUX_QER7t6smFDda0mayeqiopvJihSzX1OdcRmJ9W4mkRwbOeUETmcbrIARH4NYKNYRXHfpViCmJEww3HCJXzfkumwef5xmTvOQXM0KgRrlQHlfuuWQ',
    tags: ['Inca Kola', 'Coca Cola', '1.5 Litros']
  },
  {
    id: 'gaseosa-pepsi-2l',
    title: 'Gaseosa Pepsi 2 Litros',
    description: 'Botella de 2 Litros bien helada.',
    price: 11.00,
    category: 'bebidas',
    categoryLabel: 'Bebidas & Refrescos',
    image: FLYER_CLASICA_IRRESISTIBLE,
    tags: ['Pepsi', '2 Litros']
  },
  {
    id: 'cerveza-cusquena',
    title: 'Cerveza Cusqueña 310ml (Trigo / Negra)',
    description: 'Botella personal bien helada.',
    price: 8.00,
    category: 'bebidas',
    categoryLabel: 'Bebidas & Refrescos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHnPag0MxK-Nj_krywoquzKvVSPtuB4fqv8PyqC2yiOMiqQCHoOeQ2P7ztDmcy-TBq7dq7dPZXlM7QlBiAL9biHr16JoIpWAy3AJ3tLtkw7NBwyjidNUHoTqWTvrfXVujsRpu5F_SF0lpg-hU7c-PCk5vAEn7VMvTt43rNRkxoFAC86d1ldxPw8emcrPSnIj8Z2Wjo8rScFIL8I82R0-1lAN2p3oD_S61utGDjHHdzXYp35Or19whD',
    tags: ['Cerveza', 'Cusqueña', 'Trigo', 'Negra']
  }
];

export const RESTAURANT_INFO = {
  name: 'Pollería El Toñito',
  tagline: 'El Mejor Pollo de Lima',
  slogan: 'Tradición & Fuego a la Leña',
  address: 'Av. Próceres de la Independencia 1420, San Juan de Lurigancho, Lima - Perú',
  reference: 'A 2 cuadras de la estación Pirámide del Sol del Metro de Lima',
  phone1: '928 067 861',
  phone2: '910 449 497',
  whatsappNumber: '51928067861',
  schedule: 'Lunes a Domingo: 12:00 PM a 11:00 PM (Horario corrido)',
  deliveryZones: [
    'San Juan de Lurigancho (Todo el distrito)',
    'Zárate',
    'Las Flores',
    'Canto Grande',
    'Campoy',
    'Mangomarca',
    'Pirámide del Sol',
    'Jicamarca (Zonas principales)'
  ],
  deliveryTime: '30 - 45 min',
  paymentMethods: [
    { id: 'yape', name: 'Yape', note: 'Al número 928 067 861 (Antonio)' },
    { id: 'plin', name: 'Plin', note: 'Al número 928 067 861' },
    { id: 'tarjeta', name: 'Tarjetas Visa / Mastercard', note: 'Llevamos POS inalámbrico' },
    { id: 'efectivo', name: 'Efectivo contraentrega', note: 'Indicar monto para el vuelto' }
  ],
  taperPolicy: 'Costo por unidad de táper térmico: S/ 1.50 para garantizar que tu pedido llegue caliente y crujiente.',
  corchoPolicy: 'Se cobra derecho de corcho por bebida consumida en salón.'
};
