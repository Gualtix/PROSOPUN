#include <linux/module.h>
#define INCLUDE_VERMAGIC
#include <linux/build-salt.h>
#include <linux/vermagic.h>
#include <linux/compiler.h>

BUILD_SALT;

MODULE_INFO(vermagic, VERMAGIC_STRING);
MODULE_INFO(name, KBUILD_MODNAME);

__visible struct module __this_module
__section(".gnu.linkonce.this_module") = {
	.name = KBUILD_MODNAME,
	.init = init_module,
#ifdef CONFIG_MODULE_UNLOAD
	.exit = cleanup_module,
#endif
	.arch = MODULE_ARCH_INIT,
};

#ifdef CONFIG_RETPOLINE
MODULE_INFO(retpoline, "Y");
#endif

static const struct modversion_info ____versions[]
__used __section("__versions") = {
	{ 0xb8a652f1, "module_layout" },
	{ 0x1dc732d0, "single_release" },
	{ 0x5c72b04a, "seq_lseek" },
	{ 0xc309e306, "seq_read" },
	{ 0x97c8f0c3, "proc_remove" },
	{ 0xae1d76d2, "proc_create" },
	{ 0x94395e6a, "seq_printf" },
	{ 0x40c7247c, "si_meminfo" },
	{ 0xf353784a, "single_open" },
	{ 0xc5850110, "printk" },
	{ 0xbdfb6dbb, "__fentry__" },
};

MODULE_INFO(depends, "");


MODULE_INFO(srcversion, "656AD7322DE8FE4A37A4E8A");
