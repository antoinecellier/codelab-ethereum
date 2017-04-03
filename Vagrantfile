# -*- mode: ruby -*-
# vi: set ft=ruby :

$BASE_BOX = '20170327_140421-ubuntu-xenial64-codelab-ethereum'

Vagrant.configure(2) do |config|
	config.vm.provider 'virtualbox' do |vb|
		vb.gui = false
		vb.customize ['modifyvm', :id, '--clipboard', 'bidirectional']
		vb.customize ["modifyvm", :id, "--memory", "4096"]
	end
	config.ssh.username = 'ubuntu'
	config.vm.box = $BASE_BOX
	config.vm.hostname = 'codelab-ethereum'
	config.vm.network 'private_network', type: 'dhcp'
end
