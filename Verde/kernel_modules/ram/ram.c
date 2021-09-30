#include <linux/module.h>
#include <linux/moduleparam.h>
#include <linux/init.h>
#include <linux/kernel.h>   
#include <linux/proc_fs.h>
#include <linux/uaccess.h>
#include <linux/fs.h>
#include <linux/utsname.h>
#include <linux/mm.h>
#include <linux/swapfile.h>
#include <linux/seq_file.h>
#define BUFSIZE  1000

unsigned long copy_to_user(void __user *to,const void *from, unsigned long n);
unsigned long copy_from_user(void *to,const void __user *from,unsigned long n);
MODULE_LICENSE("RAM");
MODULE_AUTHOR("Grupo");
struct sysinfo i;

static struct proc_dir_entry *ent;

static ssize_t mywrite(struct file *file, const char __user *ubuf,size_t count, loff_t *ppos) 
{
    printk( KERN_DEBUG "write handler\n");
    return -1;
}


static int myread (struct seq_file *buff, void *v){

    printk( KERN_DEBUG "read handler\n");
    si_meminfo(&i);
    seq_printf(buff,"{\"total\":%ld, \"libre\": %ld, \"mem_unit\": %ld}", i.totalram, i.freeram,i.mem_unit);
    
    return 0;
}

static int proc_init (struct inode *inode, struct file *file){
    return single_open(file,myread,NULL);
}
    
/*
static const struct proc_ops myops ={
    .owner =THIS_MODULE,
    .read=seq_read,
    .release=single_release,
    .open=proc_init,
    .llseek=seq_lseek
};
*/

static struct proc_ops myops={
    .proc_open = proc_init,
    .proc_release = single_release,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_write = mywrite
};

static int simple_init(void){

    printk(KERN_INFO "Iniciando la Lectura de Ram\n");
    ent=proc_create("ram",0,NULL,&myops);
    return 0;
}

static void simple_cleanup(void)
{
    printk(KERN_INFO "Saliendo\n");
    proc_remove(ent);
}

module_init(simple_init);
module_exit(simple_cleanup);