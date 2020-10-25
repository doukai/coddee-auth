package com.coddee.auth.security.casbin;

import static com.coddee.auth.security.casbin.CasbinProperties.*;

import com.coddee.auth.domain.Role;
import com.coddee.auth.repository.RoleRepository;
import com.coddee.auth.repository.UserRepository;
import java.util.List;
import org.casbin.jcasbin.model.Model;
import org.casbin.jcasbin.persist.Adapter;
import org.casbin.jcasbin.persist.Helper;

public class CasbinRBACAdapter implements Adapter {
    private UserRepository userRepository;

    private RoleRepository roleRepository;

    public CasbinRBACAdapter(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void loadPolicy(Model model) {
        List<Role> roles = roleRepository.findAllWithEagerRelationships();
        roles.forEach(
            role -> {
                role
                    .getResources()
                    .forEach(
                        resource -> {
                            CasbinRule line = new CasbinRule();
                            line.setPtype(P_TYPE);
                            line.setV0(role.getRoleCode());
                            line.setV1(role.getTenant().getDomain());
                            line.setV2(resource.getUrl());
                            line.setV3(resource.getMethod().name());
                            loadPolicyLine(line, model);
                        }
                    );

                if (null != role.getUsers() && role.getUsers().size() > 0) {
                    role
                        .getUsers()
                        .forEach(
                            user -> {
                                CasbinRule line = new CasbinRule();
                                line.setPtype(G_TYPE);
                                line.setV0(USER_PREFIX + user.getLogin());
                                line.setV1(role.getRoleCode());
                                line.setV2(user.getTenant().getDomain());
                                loadPolicyLine(line, model);
                            }
                        );
                }

                if (null != role.getParentRoles() && role.getParentRoles().size() > 0) {
                    role
                        .getParentRoles()
                        .forEach(
                            parentRole -> {
                                CasbinRule line = new CasbinRule();
                                line.setPtype(G_TYPE);
                                line.setV0(ROLE_PREFIX + role.getRoleCode());
                                line.setV1(parentRole.getRoleCode());
                                line.setV2(role.getTenant().getDomain());
                                loadPolicyLine(line, model);
                            }
                        );
                }
            }
        );
    }

    private static void loadPolicyLine(CasbinRule line, Model model) {
        String lineText = line.getPtype();
        if (line.getV0() != null) {
            lineText += ", " + line.getV0();
        }
        if (line.getV1() != null) {
            lineText += ", " + line.getV1();
        }
        if (line.getV2() != null) {
            lineText += ", " + line.getV2();
        }
        if (line.getV3() != null) {
            lineText += ", " + line.getV3();
        }
        if (line.getV4() != null) {
            lineText += ", " + line.getV4();
        }
        if (line.getV5() != null) {
            lineText += ", " + line.getV5();
        }
        Helper.loadPolicyLine(lineText, model);
    }

    @Override
    public void savePolicy(Model model) {}

    @Override
    public void addPolicy(String sec, String ptype, List<String> rule) {}

    @Override
    public void removePolicy(String sec, String ptype, List<String> rule) {}

    @Override
    public void removeFilteredPolicy(String sec, String ptype, int fieldIndex, String... fieldValues) {}
}
